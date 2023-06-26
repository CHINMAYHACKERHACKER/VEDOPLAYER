import { useState } from "react";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LOG.css";
import { v4 as uuidv4 } from 'uuid';


const LOGIN = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [PROFESSION, setPROFESSION] = useState("");
  const [LANGUAGE, setLANGUAGE] = useState("");
  const [IMAGE, setIMAGE] = useState("");
  const [USERGENERATEDID, setUSERGENERATEDID] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };


  const onSignup = (e) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        username,
        secret,
        email,
        first_name,
        last_name,
      })
    alert("You have signed up");
    METHOD();
  }


  const METHOD = () => {
    const FORMDATA = new FormData();
    FORMDATA.append("FIRSTNAME", first_name);
    FORMDATA.append("LASTNAME", last_name);
    FORMDATA.append("IMAGE", IMAGE);
    FORMDATA.append("PROFESSION", PROFESSION);
    FORMDATA.append("LANGUAGE", LANGUAGE);
    FORMDATA.append("USERGENERATEDID", USERGENERATEDID);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/USERDATA`, FORMDATA);
      
  }



  return <>
    <body className="page">
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
                {/* <Link className="nav-link text-white" to="/HOME">Home</Link> */}
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
        </div>
      </nav>

      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#signup">Sign Up</a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div id="login" className="tab-pane active">
                    <form onSubmit={onLogin}>
                      <div className="form-group">
                        <label for="email">Username:</label>
                        <input type="text" className="form-control" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setSecret(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{marginLeft:"1%"}}>Login</button>
                    </form>
                  </div>
                  <div id="signup" className="tab-pane">
                    <form onSubmit={onSignup}>
                      <div className="form-group">
                        <label for="name">Username:</label>
                        <input type="text" className="form-control" placeholder="Enter name" onChange={(e) => setUsername(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label for="email">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => setSecret(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label for="pwd">Email:</label>
                        <input type="email" className="form-control" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label for="pwd">First Name:</label>
                        <input type="text" className="form-control" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label for="pwd">Last Name:</label>
                        <input type="text" className="form-control" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)} required />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{marginLeft:"1%"}}>Sign Up</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </>
}

export default LOGIN;
