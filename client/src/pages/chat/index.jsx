import useAppStore from '@/store/store'
import React from 'react'
import ContactContainer from './components/contact-container';
import EmptyChatContainer from './components/empty-chat-container';
import ChatContainer from './components/chat-container';
import ChatComponent from '../checkSocket';

function Chat() {
  const id = useAppStore((state)=>(state.id))
  console.log(id);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ChatComponent />
    <ContactContainer/>
    {/* <EmptyChatContainer /> */}
    <ChatContainer />
    </div>
  )
}

export default Chat