import React, { Fragment, useEffect } from 'react'
import '../styles/css/home.css'
import { getSession } from '../includes/Session'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Messages from '../components/Messages'

const Home = () => {
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
      })
      .catch((error) => {
            console.log(error);
      });
  },[])

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
                <div className="contact">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="contents">
                          <div className="acc">
                              <div className="acc-l">
                                  <h4>
                                      John Doe
                                  </h4>
                                  <p>
                                      Hello Mr. Mozafari <span role="img" aria-label="emoji">🤚</span>
                                  </p>
                              </div>
                              <div className="acc-r">
                                  <p>
                                      Monday
                                  </p>
                              </div>
                          </div> 
                      </div>
                </div>
                <div className="contact">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="contents">
                          <div className="acc">
                              <div className="acc-l">
                                  <h4>
                                      Brad
                                  </h4>
                                  <p>
                                      <span data-testid="msg-dblcheck" aria-label=" Read " data-icon="msg-dblcheck" className="_1RD_6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>
                                      Whatsup?
                                  </p>
                              </div>
                              <div className="acc-r">
                                  <p>
                                      Yesterday
                                  </p>
                              </div>
                          </div> 
                      </div>
                </div>
                <div className="contact">
                  <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                  <div className="contents">
                      <div className="acc">
                          <div className="acc-l">
                              <h4>
                                  Brad
                              </h4>
                              <p>
                                  <span data-testid="msg-dblcheck" aria-label=" Read " data-icon="msg-dblcheck" className="_1RD_6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>
                                  Whatsup?
                              </p>
                          </div>
                          <div className="acc-r">
                              <p>
                                  Yesterday
                              </p>
                          </div>
                      </div> 
                  </div>
            </div>
            <div className="contact">
              <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
              <div className="contents">
                  <div className="acc">
                      <div className="acc-l">
                          <h4>
                              Brad
                          </h4>
                          <p>
                              <span data-testid="msg-dblcheck" aria-label=" Read " data-icon="msg-dblcheck" className="_1RD_6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>
                              Whatsup?
                          </p>
                      </div>
                      <div className="acc-r">
                          <p>
                              Yesterday
                          </p>
                      </div>
                  </div> 
              </div>
        </div>
        <div className="contact">
          <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
          <div className="contents">
              <div className="acc">
                  <div className="acc-l">
                      <h4>
                          Brad
                      </h4>
                      <p>
                          <span data-testid="msg-dblcheck" aria-label=" Read " data-icon="msg-dblcheck" className="_1RD_6"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg></span>
                          Whatsup?
                      </p>
                  </div>
                  <div className="acc-r">
                      <p>
                          Yesterday
                      </p>
                  </div>
              </div> 
          </div>
    </div>
                <div className="contact">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="contents">
                          <div className="acc">
                              <div className="acc-l">
                                  <h4>
                                      Mosh Miller
                                  </h4>
                                  <p>
                                      <span data-testid="status-dblcheck" data-icon="status-dblcheck" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="#6df" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path></svg></span>
                                      Exactly.
                                  </p>
                              </div>
                              <div className="acc-r">
                                  <p>
                                      Sunday
                                  </p>
                              </div>
                          </div> 
                      </div>
                </div>
                <div className="contact">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="contents">
                          <div className="acc">
                              <div className="acc-l">
                                  <h4>
                                      +98 930 600 54 99
                                  </h4>
                                  <p>
                                    It's cool ! <span role="img" aria-label="emoji">🤪</span>
                                  </p>
                              </div>
                              <div className="acc-r">
                                  <p>
                                      Thursday 
                                  </p>
                              </div>
                          </div> 
                      </div>
                </div>
                <div className="contact selected">
                  <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                  <div className="contents">
                      <div className="acc">
                          <div className="acc-l">
                              <h4>
                                  Ahmadreza
                              </h4>
                              <p>
                                  <span role="img" aria-label="emoji">😍👌</span>
                              </p>
                          </div>
                          <div className="acc-r">
                              <p>
                                  Friday
                              </p>
                          </div>
                      </div> 
                  </div>
                  </div>
                  <div className="contact">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="contents">
                          <div className="acc">
                              <div className="acc-l">
                                  <h4>
                                      +98 911 321 98 99
                                  </h4>
                                  <p>
                                      <span data-testid="status-dblcheck" data-icon="status-dblcheck" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="#6df" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path></svg></span>
                                      Make a wish !
                                  </p>
                              </div>
                              <div className="acc-r">
                                  <p>
                                      Tuesday 
                                  </p>
                              </div>
                          </div> 
                      </div>
                  </div>
                  <div className="contact">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="contents">
                        <div className="acc">
                            <div className="acc-l">
                                <h4>
                                    +98 921 121 00 74
                                </h4>
                                <p>
                                    Thanks bro.
                                </p>
                            </div>
                            <div className="acc-r">
                                <p>
                                    Yesterday
                                </p>
                            </div>
                        </div> 
                      </div>
                </div>
              </div>
          </section>
          
          <section id="right">
              <header className="head right-head">
                      <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                      <div className="profile-name">
                          <h4>
                              Ahmadreza
                          </h4>
                          <p>
                              last seen at 9:32 PM 
                          </p>
                      </div>
                      <div className="tools">
                          <span data-testid="search-alt" data-icon="search-alt" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></span>
                          <span data-testid="menu" data-icon="menu" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg></span>
                      </div>
              </header>
              <section className="message">
                  <Messages />
              </section>
              <section className="write-box">
                  <div className="added-ops">
                      <span data-testid="smiley" data-icon="smiley" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path></svg></span>
                      <span data-testid="clip" data-icon="clip" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg></span>    
                  </div>
                  <input type="text" placeholder="Type a message"/>
                  <div>
                      <span data-testid="ptt" data-icon="ptt" className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg></span>
                  </div>
              </section>   
          </section>
      </div>
    </Fragment>
  )
}

export default Home