import React,{ useEffect, useState } from 'react'
import '../styles/css/chatarea.css'
import { useSelector } from 'react-redux'



const Messages = () => {
  const acchat = useSelector(state=>state.active)
  if(Object.keys(acchat).length !== 0){
    console.log(acchat.messages.at(-1));
  }
  const today = new Date()
  useEffect(()=>{
    scrollToBottom(document.querySelector('.chat-area'))
  },[])
  const scrollToBottom = (element) => {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }
  return (
    <div className="chat-area">
      {(Object.keys(acchat).length !== 0)?acchat.messages.filter((v,i,a)=>a.findIndex(v2=>['mess_id'].every(k=>v2[k] ===v[k]))===i).map(message=>{return (
        (message.state==='incoming')?
        <table key={message.mess_id+today.getTime().toString(36)+Math.random().toString(36).slice(2)}>
          <tbody>
            <tr>
              <td>
                <div className="incoming">
                  <p>{message.message}</p>
                  <span className="time">{message.time}</span>
                </div>
              </td>
              <td style={{width: "1px !important"}}></td>
            </tr>
          </tbody>
        </table>
        :
        <table key={message.mess_id+today.getTime().toString(36)+Math.random().toString(36).slice(2)}>
          <tbody>
            <tr>
              <td style={{width: "1px !important"}}></td>
              <td>
                <div className="outgoing">
                  <p>{message.message}</p>
                  <span className="time">{message.time}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}):null}
    </div>
  )
}

export default Messages