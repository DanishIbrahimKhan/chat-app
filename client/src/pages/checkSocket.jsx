import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", { transports: ["websocket"] }); // Ensure correct URL

export default function ChatComponent() {
    useEffect(() => {
        console.log("🔌 Trying to connect to WebSocket...");

        socket.on("connect", () => {
            console.log("✅ Connected to server:", socket.id);
        });

        socket.on("receive_message", (data) => {
            console.log("📨 Received message from server:", data);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from server.");
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);
}
