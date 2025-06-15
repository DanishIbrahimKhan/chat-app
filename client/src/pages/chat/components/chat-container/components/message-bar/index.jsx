import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { RiEmotionLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';

function MessageBar() {
  const [message, setMessage] = useState("")
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const emojiPickerRef = useRef(null);
  useEffect(()=>{
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[emojiPickerRef])
  const handleSendMessage = () => {
    console.log(message)
    setMessage("")
  }
  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji )
  }
  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center mb-6 px-8 gap-6' >
      <div className='flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 '>
        <input type='text' className='flex-1 p-5 bg-transparent focus:border-none rounded-md focus:outline-none'
          placeholder='Enter message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'><GrAttachment className='text-2xl' /></button>
        <div className="relative">
          <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'><RiEmotionLine className='text-3xl' 
          onClick={()=>setEmojiPickerOpen(!emojiPickerOpen)}/></button>
          <div className='absolute bottom-16 right-0 ' ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={handleAddEmoji} autoFocusSearch={false} open={emojiPickerOpen}
          />
          </div>
        </div>
      </div>
      <button className='bg-[#8417ff] flex items-center justify-center rounded-md  focus:border-none focus:outline-none p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:text-white duration-300 transition-all'
      onClick={handleSendMessage}><IoSend className='text-3xl' /></button>

    </div>
  )
}

export default MessageBar