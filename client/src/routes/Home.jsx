import React, { Fragment, useEffect, useState, useCallback } from 'react'
import '../styles/css/home.css'
import '../styles/css/chatarea.css'
import { getSession } from '../includes/Session'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { acChat } from '../actions'
import { io } from 'socket.io-client'

const Home = () => {
  const dispatch = useDispatch()
  const acchat = useSelector(state=>state.active)
  const[Chat, setChat] = useState({})
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const today = new Date()
  //check user session
  const session = getSession()
  if (typeof session === 'undefined' || session === null){
    //window.location.href="/"
  }
  useEffect(() => {
      let data = JSON.stringify({id:session});
      let config = {
          method: 'post',
          url: '/auth/session',
          headers: {
          'Content-Type': 'application/json'
          },
          data : data
      };  
      axios(config)
      .then((response) => {
          if(response.data.state!=="succ"){
            //window.location.href="/"
          }
        const socket = io('http://localhost:8000')
        socket.on('connect', () => {
            console.log('connected to server')
            socket.emit('getchats', 'getchat')
            socket.on('chats', (chats)=>{
                console.log(chats);
                setChat(chats)
            })
            socket.on('connect_error', () => {
                setTimeout(() => socket.connect(), 5000)
            })
            socket.on('disconnect', () => console.log('server disconnected'))
        })
      }).catch((error) => {console.log(error)});
  },[])
  const messid = () => {
    return today.getTime().toString(36)+Math.random().toString(36).slice(2)
  }
  const[usermess, setUserMess] = useState({
    state: 'outgoing',
    messageid: messid(),
    message:'',
    time: today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
 })
  const sendMessage = (e) => {
    e.preventDefault()
    setUserMess({
        state: 'outgoing',
        messageid: messid(),
        message:e.target.message.value,
        time: today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    })
    const socket = io('http://localhost:8000')
    socket.on('connect', () => {
        socket.emit('chatmessage', usermess)
        socket.on('message', (msg)=>{
            acchat.messages.push(msg)
            dispatch(acChat(acchat))
            forceUpdate()
            console.log(acchat);
        })
        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 5000)
        })
        socket.on('disconnect', () => console.log('server disconnected'))
    })
    setUserMess({
        state: 'outgoing',
        messageid: messid(),
        message:'',
        time: today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    })
  }
  useEffect(()=>{
    scrollToBottom(document.querySelector('.chat-area'))
  },[])
  const scrollToBottom = (element) => {
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }
  return (
    <Fragment>
        <div id="all">
          <section id="left">
              <header className="head left-head">
                  <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                  <div className="tools">
                      <Link to="/status">
                          <svg id="ee51d023-7db6-4950-baf7-c34874b80976" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                      </Link>                    
                      <span data-testid="chat" data-icon="chat" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg></span>
                      <span data-testid="menu" data-icon="menu" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg></span>
                  </div>
              </header>
              <div className="search-box">
                  <div className="searchbox">
                      <span data-testid="search" data-icon="search" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></svg></span>
                      <input type="text" placeholder="Search or start new chat"/>
                  </div>
              </div>
              <div className="contacts">
                {(Object.keys(Chat).length !== 0)?Chat.chats.map(chat=>{return (
                    <div className="contact selected" key={chat.chat_id} onClick={()=>dispatch(acChat(chat))}>
                        <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                        <div className="contents">
                            <div className="acc">
                                <div className="acc-l">
                                    <h4>{chat.title}</h4>
                                    <p>{chat.messages.at(0).message}</p>
                                </div>
                                <div className="acc-r">
                                    <p>{chat.messages.at(0).time}</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                )}):null}
              </div>
          </section>
          
          <section id="right">
              <header className="head right-head">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="profile-name">
                          <h4>{acchat.title}</h4>
                          <p>{"last seen at "+acchat.last_seen}</p>
                      </div>
                      <div className="tools">
                          <span data-testid="search-alt" data-icon="search-alt" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></span>
                          <span data-testid="menu" data-icon="menu" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg></span>
                      </div>
              </header>
              <section className="message">
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
              </section>
              <section className="write-box">
                    <form onSubmit={sendMessage} className="usermessageform">
                        <div className="added-ops">
                            <span data-testid="smiley" data-icon="smiley" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg></span>
                            <span data-testid="clip" data-icon="clip" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg></span>    
                        </div>
                        <input type="text" value={usermess.message} name="message" onChange={(e) => setUserMess({ ...usermess, [e.target.name]: e.target.value })} placeholder="Type a message"/>
                        <div>
                            <span data-testid="ptt" data-icon="ptt" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg></span>
                        </div>
                    </form>
              </section>   
          </section>
      </div>
    </Fragment>
  )
}

export default Home