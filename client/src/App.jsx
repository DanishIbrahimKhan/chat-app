import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import Loader from './globalComponents/loader'

function App() {
  return (
    <BrowserRouter>
      <Loader />
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to={"/auth"}/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App