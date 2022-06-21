import React from 'react'
import '../styles/css/header.css'
import { Link } from 'react-router-dom'

const header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="flex-row">
          <div className="hbrand">
            <img src={`${process.env.PUBLIC_URL}/icons/android-chrome-512x512.png`} alt="" />
          </div>
          <div className="header-navigation">
            <nav className="nav-h">
              <ul>
                <li className="nav-h-group">
                  <Link to="/" className="nav-links">
                    Home
                  </Link>
                </li>
                <li className="nav-h-group">
                  <Link to="/about" className="nav-links">
                    About
                  </Link>
                </li>
                <li className="nav-h-group">
                  <Link to="/blog" className="nav-links">
                    Blog
                  </Link>
                </li>
                <li className="nav-h-group">
                  <Link to="/contact" className="nav-links">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default header
