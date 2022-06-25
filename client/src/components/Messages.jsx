import React from 'react'
import '../styles/css/chatarea.css'
import Chat from '../data/messages.json'
import { useEffect } from 'react'

const Messages = () => {
  useEffect(()=>{
    scrollToBottom(document.querySelector('.chat-area'))
  },[])
  const scrollToBottom = (element) => {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }
  return (
    <div className="chat-area">
      <table>
        <tr>
          <td>
            <div className="incoming">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
          <td style={{width: "1px !important;"}}></td>
        </tr>
      </table>
      <table>
        <tr>
          <td style={{width: "1px !important;"}}></td>
          <td>
            <div className="outgoing">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td style={{width: "1px !important;"}}></td>
          <td>
            <div className="outgoing">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td style={{width: "1px !important;"}}></td>
          <td>
            <div className="outgoing">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td style={{width: "1px !important;"}}></td>
          <td>
            <div className="outgoing">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td style={{width: "1px !important;"}}></td>
          <td>
            <div className="outgoing">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td style={{width: "1px !important;"}}></td>
          <td>
            <div className="outgoing">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td>
            <div className="incoming">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate perferendis voluptatibus est alias numquam sed?</p>
            </div>
          </td>
          <td style={{width: "1px !important;"}}></td>
        </tr>
      </table>
    </div>
  )
}

export default Messages