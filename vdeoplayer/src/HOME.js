import React from 'react'
import HOMECLONE from "./HOMECLONE.js";
import "./HOME.css";
import { Link } from 'react-router-dom';

const HOME = () => {
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
              <li className="nav-item">
                <Link className="nav-link text-white" to="#">Video call</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <HOMECLONE/>
  </>
}
export default HOME;