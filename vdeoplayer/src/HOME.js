import React from 'react'
import HOMECLONE from "./HOMECLONE.js";
import "./HOME.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const HOME = () => {

  const PARAM = useParams();
  console.log(PARAM);

  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* <Link className="nav-link text-white" aria-current="page" to="/HOME">Home</Link> */}
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={FUNCTION}>Chat</Link>
              </li> */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/FILE">Chat</Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link text-white" to="/DEV">Users</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/UPLOAD">Upload Videos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/VIDEO">Videos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/ABOUT" target="_blank">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/CONTACT">Contact</Link>
            </li>
          </ul>
        </div>
        <img className="user-img" src={`http://localhost:3001/uploads/${PARAM.IMAGE}`} alt="User"  style={{ borderRadius: "50%", width: "45px", height: "45px"}} />
      </div>
    </nav>
    <HOMECLONE/>
  </>
}
export default HOME;