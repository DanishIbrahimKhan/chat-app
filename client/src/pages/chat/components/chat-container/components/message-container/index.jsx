import useAppStore from "@/store/store"; // Access the app store for sender and recipient IDs
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client"; // Ensure that Socket.IO is set up

// Connect to the socket server
const socket = io("http://localhost:3001"); // Adjust the URL if needed

function MessageContainer() {
  const id = useAppStore((state) => state.id); // sender id from store
  const recipientId = useAppStore((state) => state.recipientId); // receiver id from store
  const [messages, setMessages] = useState([]); // State to hold messages
  const [message, setMessage] = useState(""); // State for the new message
  const scrollRef = useRef();

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Clean up the socket connection when the component is unmounted
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: id,
        recipientId: recipientId,
        message: message,
        timestamp: new Date().toISOString(),
      };

      // Send the message to the server
      socket.emit("send_message", newMessage);

      // Add the message to the local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the input field after sending the message
      setMessage("");
    }
  };

  // Render Direct Messages
  const renderMessages = () => {
    return messages.map((message) => (
      <div
        key={message.timestamp}
        className={`my-2 ${message.sender === id ? "text-right" : "text-left"}`}
      >
        {/* Render Text Messages */}
        <div
          className={`inline-block p-4 rounded my-1 max-w-[50%] break-words border ${
            message.sender === id
              ? "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"  // Sender's side
              : "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"  // Receiver's side
          }`}
        >
          {message.message}
        </div>
        {/* Render Timestamp */}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex-1 flex flex-col p-4 px-8 md:w-[65vw] lg:w-70vw xl:w-[80vw] w-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hidden">
        {renderMessages()}
      </div>

      {/* Message Input */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-[#8417ff] text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageContainer;
