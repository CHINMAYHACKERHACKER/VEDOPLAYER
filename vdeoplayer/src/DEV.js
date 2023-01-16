import { React } from "react";
import "./DEVELOPER.css";
import { Link } from 'react-router-dom';


const DEV = () => {
    return <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary gradient-custom">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* <Link className="nav-link text-white" aria-current="page" to="/HOME">Home</Link> */}
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/FILE">Chat</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <div className="user-cards-container">
            <div className="user-card">
                <img className="user-img" src="image2.jpg" alt="User" />
                <div className="user-info">
                    <h3>chinmay kanashetti</h3>
                    <p className="user-title">software Developer</p>
                    <p className="user-email">jdoe@email.com</p>
                </div>
            </div>
        </div>
    </>
}

export default DEV;