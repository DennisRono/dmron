import React, { Fragment, useState } from 'react'
import '../styles/css/auth.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setSession } from '../includes/Session'

const Auth = () => {
  const[view, setView] = useState("login")
  const [regdat, setRegDat] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [logdat, setLogDat] = useState({
    email: '',
    password: ''
  })
  const[globErr, setglobErr] = useState('')
  const[passerr, setPasserr] = useState("<span class='passwarn' style='background-color: gray;'></span>".repeat(8))
  const[cpasserr, setcPasserr] = useState({text: "", Floatclassname: '', Inputclassname: ''})
  const[phoneErr, setphoneErr] = useState({text: "", Floatclassname: '', Inputclassname: ''})
  //check phone number
    const checkphone = (a) => {
        if(isNaN(a)){
            setphoneErr({text: "Invalid Phone number", Floatclassname: 'id-err', Inputclassname: 'id-input'})
        }else{
            /* eslint-disable-next-line */
            if(!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(a)) && a.length>10 || a.length>14){
                setphoneErr({text: "Invalid Phone number", Floatclassname: 'id-err', Inputclassname: 'id-input'})
            } else {
                setphoneErr({text: "", Floatclassname: '', Inputclassname: ''})
            }
        }
    }
  //check password strength
  const passcheck = (a) => {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    if (a.length !== 0) {
      if (strongPassword.test(a) || a.length > 10) {
        setPasserr("<span class='passwarn' style='background-color: #3cff87;'></span>".repeat(8))
      } else if (mediumPassword.test(a) || a.length > 6) {
        setPasserr("<span class='passwarn' style='background-color: #ffea71;'></span>".repeat(8))
      } else {
        setPasserr("<span class='passwarn' style='background-color: #fe7979;'></span>".repeat(8))
      }
    } else {
        setPasserr("<span class='passwarn' style='background-color: gray;'></span>".repeat(8))
    }
  }
    const confirmpass = (a) => {
        if(a.length >= regdat.password.length){
            if(a !== regdat.password){
                setcPasserr({text: "passwords did not match!", Floatclassname: 'id-err', Inputclassname: 'id-input'})
            } else {
                setcPasserr({text: "", Floatclassname: '', Inputclassname: ''})
            }
        }
    }

  //handle reg form submission
  const handleRegSubmit = (e) => {
    e.preventDefault();
    console.log(regdat);
    sendRegData('register', regdat);
    setRegDat({ email: "", phone: "", password: "", confirmPassword: '' })
  }
  //send data to server
  const sendRegData = (activity, thedata) => {
      let data = JSON.stringify(thedata);
      let config = {
          method: 'post',
          url: '/auth/'+activity,
          headers: {
          'Content-Type': 'application/json'
          },
          data : data
      };
      
      axios(config)
      .then((response) => {
        if(response.data.msg!==""){
            setglobErr(response.data.msg)
        }
        if(response.data.state==="succ"){
            setTimeout(() => {
                setglobErr("Redirecting ...")
            }, 1000);
            setTimeout(() => {
                setglobErr("")
                setView("login")
            }, 3000);
        }
        console.log(response.data);
      })
      .catch((error) => {
            setglobErr(error.data.msg)
            console.log(error);
      });
  }
  //handle login form submission
  const handleLogSubmit = (e) => {
    e.preventDefault();
    console.log(logdat);
    sendLogData('login', logdat);
    setLogDat({ email: "", password: "" })
  }
  //send data to server
  const sendLogData = (activity, thedata) => {
      let data = JSON.stringify(thedata);
      let config = {
          method: 'post',
          url: '/auth/'+activity,
          headers: {
          'Content-Type': 'application/json'
          },
          data : data
      };
      
      axios(config)
      .then((response) => {
            if(response.data.msg!==""){
                setglobErr(response.data.msg)
            }
            if(response.data.state==="succ"){
                setTimeout(() => {
                    setglobErr("Redirecting ...")
                }, 1000);
                setTimeout(() => {
                    setglobErr("")
                    setSession(response.data.ID)
                    window.location.href = "/home"
                }, 3000);
            }
            console.log(response.data);
      })
      .catch((error) => {
            setglobErr("something went wrong in the network")
            console.log(error);
      });
  }


  //handle login Logic
  return (
    <Fragment>
      <div className="container wrapper">
        <div className="auth">
          <div className="auth-play">
            <div className="auth-main">
              <div className={(view==="login")?"auth-login":"log-hide"} style={{ marginTop: "10%" }}>
                <h2 className="reg-title">Login into your account</h2>
                <form className="register-form" onSubmit={handleLogSubmit}>
                    <span id="id-messa">{globErr}</span>
                    <div className="user-input-wrp">
                        <input
                            id="id-input"
                            type="email"
                            name="email"
                            value={logdat.email}
                            className="inputText"
                            onChange={(e) => setLogDat({ ...logdat, [e.target.name]: e.target.value })}
                        />
                        <span className="floating-label">
                            Email <span style={{ color: 'red' }}>*</span>
                        </span>
                    </div>
                    <span id="id-err"></span>
                    <div className="user-input-wrp">
                        <input
                            id="id-input"
                            type="password"
                            name="password"
                            value={logdat.password}
                            className={(logdat.password!=='')?"focusInput inputText":"inputText"}
                            onChange={(e) => {
                                setLogDat({ ...logdat, [e.target.name]: e.target.value })
                            }}
                        />
                        <span className={(logdat.password!=='')?"floating-label floatlabel":"floating-label"}>
                            Password <span style={{ color: 'red' }}>*</span>
                        </span>
                    </div>
                    <div className="termsofservice">
                        <br/>
                        <p>By loging in to dmron you opt in to our <Link to="" >terms of service</Link> and our <Link to="" >privacy policies</Link></p>
                        <br/>
                    </div>
                    <div className="subflex">
                        <input type="submit" value="sign in" className="register-btn"/>
                        <div className="logDirect">
                            <p>
                                Don't have an account? &nbsp;
                                <span onClick={()=>{setView("register")}} style={{textDecoration:"underline", color: "blue", cursor: "pointer" }}>register here</span>
                            </p>
                        </div>
                    </div>
                </form>
              </div>
              <div className={(view==="register")?"auth-register":"reg-hide"}>
                <h2 className="reg-title">Create an account to get started</h2>
                <form className="register-form" onSubmit={handleRegSubmit}>
                    <span id="id-messa">{globErr}</span>
                    <div className="user-input-wrp">
                        <input
                            id="id-input"
                            type="email"
                            name="email"
                            value={regdat.email}
                            className="inputText"
                            onChange={(e) => setRegDat({ ...regdat, [e.target.name]: e.target.value })}
                        />
                        <span className="floating-label">
                            Email <span style={{ color: 'red' }}>*</span>
                        </span>
                    </div>
                    <span id="id-err"></span>
                    <div className="user-input-wrp">
                        <input
                            id="id-input"
                            type="text"
                            name="phone"
                            value={regdat.phone}
                            className={(regdat.phone!=='')?phoneErr.Inputclassname+" focusInput inputText":phoneErr.Inputclassname+" inputText"}
                            onChange={(e) => {
                                setRegDat({ ...regdat, [e.target.name]: e.target.value })
                                checkphone(e.target.value)
                            }}
                        />
                        <span className={(regdat.phone!=='')?"floating-label floatlabel":"floating-label"}>
                            Phone number <span style={{ color: 'red' }}>*</span>
                        </span>
                    </div>
                    <span id="id-err" className={phoneErr.Floatclassname}>{phoneErr.text}</span>
                    <div className="user-input-wrp">
                        <input
                            id="id-input"
                            type="password"
                            name="password"
                            value={regdat.password}
                            className={(regdat.password!=='')?"focusInput inputText":"inputText"}
                            onChange={(e) => {
                            setRegDat({ ...regdat, [e.target.name]: e.target.value })
                            passcheck(e.target.value)
                            }}
                        />
                        <span className={(regdat.password!=='')?"floating-label floatlabel":"floating-label"}>
                            Password <span style={{ color: 'red' }}>*</span>
                        </span>
                    </div>
                    <span id="pass-err" dangerouslySetInnerHTML={{__html: passerr}}></span>
                    <br/>
                    <div className="user-input-wrp">
                        <input
                            id="id-input"
                            type="password"
                            name="confirmPassword"
                            value={regdat.confirmPassword}
                            className={(regdat.confirmPassword!=='')?cpasserr.Inputclassname+" focusInput inputText":cpasserr.Inputclassname+" inputText"}
                            onChange={(e) => {
                            setRegDat({ ...regdat, [e.target.name]: e.target.value })
                            confirmpass(e.target.value)
                            }}
                        />
                        <span className={(regdat.confirmPassword!=='')?"floating-label floatlabel":"floating-label"}>
                            Confirm Password <span style={{ color: 'red' }}>*</span>
                        </span>
                    </div>
                    <span id="id-err" className={cpasserr.Floatclassname}>{cpasserr.text}</span>
                    <div className="termsofservice">
                        <br/>
                        <p>By signing up to dmron you opt in to our <Link to="" >terms of service</Link> and our <Link to="" >privacy policies</Link></p>
                        <br/>
                    </div>
                    <div className="subflex">
                        <input type="submit" value="sign up" className="register-btn"/>
                        <div className="logDirect">
                            <p>
                                Already have an account? &nbsp;
                                <span onClick={()=>{setView("login")}}  style={{textDecoration:"underline", color: "blue", cursor: "pointer" }}>login here</span>
                            </p>
                        </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Auth
