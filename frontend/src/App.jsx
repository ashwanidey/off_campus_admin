import { useState } from 'react'
import './App.css'
import UserPage from './pages/UserPage/UserPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage'
import SessionDetailPage from './pages/SessionDetailPage/SessionDetailPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/users" element={<UserPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/details/:id" element={<UserDetailsPage/>} />
        <Route path="/session" element={<SessionDetailPage/>} />
      </Routes>
       
    </>
  )
}

export default App
