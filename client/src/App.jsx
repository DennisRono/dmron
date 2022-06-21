import React, { Fragment, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Auth from './routes/Auth'
import About from './routes/About'
import Status from './routes/Status'
import Blog from './routes/Blog'
import Contact from './routes/Contact'

const App = () => {
  const [time, setTime] = useState('fetching')
  useEffect(() => {
    const socket = io('*')
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
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home time={time}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/status" element={<Status />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
