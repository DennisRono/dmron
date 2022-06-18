import React, { Fragment, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import About from './routes/About'
import Blog from './routes/Blog'
import Contact from './routes/Contact'

const App = () => {
  const [time, setTime] = useState('fetching')
  useEffect(() => {
    const socket = io('http://localhost:5000')
    socket.on('connect', () => console.log(socket.id))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })
    socket.on('time', (data) => setTime(data))
    socket.on('disconnect', () => setTime('server disconnected'))
  }, [])
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
