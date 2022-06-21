import React from 'react'
import '../styles/css/status.css'

const Status = () => {
  return (
    <div>
        <div id="all-status">
            
            <div id="left-status">
                <section className="left-head-status">
                    <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                    <div>
                        <h4>
                            My Status
                        </h4>
                        <p>
                            No Updates
                        </p>
                    </div>
                </section>
                <section className="left-status-recent">
                    <div className="seprator">
                        <p>
                            viewed
                        </p>
                    </div>
                    <div className="statuses">
                        <div>
                            <a href="status.html#">
                                <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                            </a>
                        </div>
                        <div>
                            <h4>
                                John Doe
                            </h4>
                            <p>
                                todat at 15:04 AM
                            </p>
                        </div>
                    </div>
                    <div className="statuses">
                        <div>
                            <a href="status.html#">
                                <img src={`${process.env.PUBLIC_URL}/images/brand.png`} alt=""/>
                            </a>
                        </div>
                        <div>
                            <h4>
                                Brad
                            </h4>
                            <p>
                                today at 12:12 AM
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            
            <div id="right-status">
                <div className="objects">
                    <span data-testid="status-v3-placeholder" data-icon="status-v3-placeholder" className=""><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80"><path fill="currentColor" d="M30.566 78.982c-.222 0-.447-.028-.672-.087C12.587 74.324.5 58.588.5 40.631c0-3.509.459-6.989 1.363-10.343a2.625 2.625 0 0 1 5.068 1.366 34.505 34.505 0 0 0-1.182 8.977c0 15.578 10.48 29.226 25.485 33.188a2.625 2.625 0 0 1-.668 5.163zm19.355-.107C67.336 74.364 79.5 58.611 79.5 40.563c0-3.477-.452-6.933-1.345-10.27a2.624 2.624 0 1 0-5.071 1.356 34.578 34.578 0 0 1 1.166 8.914c0 15.655-10.545 29.319-25.646 33.23a2.625 2.625 0 0 0 1.317 5.082zM15.482 16.5C21.968 9.901 30.628 6.267 39.867 6.267c9.143 0 17.738 3.569 24.202 10.05a2.625 2.625 0 0 0 3.717-3.708C60.329 5.135 50.413 1.018 39.867 1.018c-10.658 0-20.648 4.191-28.128 11.802a2.624 2.624 0 1 0 3.743 3.68z"></path></svg></span>
                    <div>
                        Click on a contact to view their status updates
                    </div>
                    <span>
                        <a href="index.html#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19.8 5.8l-1.6-1.6-6.2 6.2-6.2-6.2-1.6 1.6 6.2 6.2-6.2 6.2 1.6 1.6 6.2-6.2 6.2 6.2 1.6-1.6-6.2-6.2 6.2-6.2z"></path></svg>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Status