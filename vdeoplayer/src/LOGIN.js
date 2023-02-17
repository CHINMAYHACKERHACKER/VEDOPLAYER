import { useState } from "react";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { useEffect } from "react";
import {Link} from "react-router-dom";
import "./LOG.css";


const LOGIN = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [PROFESSION, setPROFESSION] = useState("");
  const [LANGUAGE, setLANGUAGE] = useState("");
  const [IMAGE, setIMAGE] = useState("");
  console.log(IMAGE);


  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  const onSignup = (e) => {
    axios
      .post("http://localhost:3001/signup", {
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


    axios
      .post("http://localhost:3001/USERDATA", FORMDATA);
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
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/DEV">Developers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/RES">Resources</Link>
            </li>
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

    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#login">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#signup">Sign Up</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <div class="tab-content">
                <div id="login" class="tab-pane active">
                  <form onSubmit={onLogin}>
                    <div class="form-group">
                      <label for="email">Username:</label>
                      <input type="text" class="form-control" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div class="form-group">
                      <label for="pwd">Password:</label>
                      <input type="password" class="form-control" placeholder="Enter password" onChange={(e) => setSecret(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                  </form>
                </div>
                <div id="signup" class="tab-pane">
                  <form onSubmit={onSignup}>
                    <div class="form-group">
                      <label for="name">Username:</label>
                      <input type="text" class="form-control" placeholder="Enter name"  onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div class="form-group">
                      <label for="email">Password:</label>
                      <input type="password" class="form-control" placeholder="Enter Password"  onChange={(e) => setSecret(e.target.value)} required />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Email:</label>
                      <input type="email" class="form-control" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div class="form-group">
                      <label for="pwd">First Name:</label>
                      <input type="text" class="form-control" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Last Name:</label>
                      <input type="text" class="form-control" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Profession:</label>
                      <input type="text" class="form-control" placeholder="Enter Profession" onChange={(e) => setPROFESSION(e.target.value)} required />
                    </div>
                    <div class="form-group">
                      <label for="pwd">programming languages:</label>
                      <textarea type="text" class="form-control" placeholder="Enter programming languages"  onChange={(e) => setLANGUAGE(e.target.value)} required />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Upload Your Image:</label>
                      <input type="file" class="form-control" onChange={(e) => setIMAGE(e.target.files[0])}  required />
                    </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* <div className="vh-200 gradient-custom">
      <title>Login and Sign Up</title>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Login
              </div>
              <div className="card-body">
                <form onSubmit={onLogin}>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" id="user" name="user" onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="pass" name="pass" onChange={(e) => setSecret(e.target.value)} />
                  </div>
                  <button type="submit" className="btn" id="login-button">Login</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                Sign Up
              </div>
              <div className="card-body">
                <form onSubmit={onSignup}>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" onChange={(e) => setSecret(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="First Name">First Name:</label>
                    <input type="text" className="form-control" onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Last Name">Last Name:</label>
                    <input type="text" className="form-control" onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Last Name">Profession :</label>
                    <input type="text" className="form-control" onChange={(e) => setPROFESSION(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Last Name">programming languages:</label>
                    <textarea type="text" className="form-control" onChange={(e) => setLANGUAGE(e.target.value)} placeholder="Write Programming Languages and Frameworks Give Some Comma After Each" required />
                  </div>
                  <p>Upload Your Image</p>
                  <input type="file" className="form-control-file" onChange={(e) => setIMAGE(e.target.files[0])}  required /><br />
                  <button type="submit" className="btn" id="signup-button">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </body>
  </>
}

export default LOGIN;
