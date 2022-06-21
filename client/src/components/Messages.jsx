import React from 'react'
import Chat from '../data/messages.json'

const Messages = () => {
  return (
    <div>{Chat.chat.message}</div>
  )
}

export default Messages