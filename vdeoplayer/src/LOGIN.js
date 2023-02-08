import { useState } from "react";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { useEffect } from "react";
import {Link} from "react-router-dom";


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

    <div className="vh-200 gradient-custom">
      <title>Login and Sign Up</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
      <style dangerouslySetInnerHTML={{ __html: "\n    /* Custom CSS styles */\n    body {\n      background-color: #f2f2f2;\n    }\n    .card {\n      width: 400px;\n      margin: 50px auto;\n    }\n    .card-header {\n      background-color: #6CB2EB;\n      color: white;\n      text-align: center;\n    }\n    .form-control {\n      margin-bottom: 15px;\n    }\n    #login-button {\n      background-color: #6CB2EB;\n      color: white;\n      width: 100%;\n      margin-top: 20px;\n    }\n    #signup-button {\n      background-color: #4CAF50;\n      color: white;\n      width: 100%;\n      margin-top: 20px;\n    }\n  " }} />
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
    </div>
  </>
  // <div className="login-page">
  //   <div className="card">
  //     {/* Login Form */}
  //     <form onSubmit={onLogin}>
  //       <div className="title">Login</div>
  //       <input
  //         type="text"
  //         name="username"
  //         placeholder="Username"
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         name="secret"
  //         placeholder="Password"
  //         onChange={(e) => setSecret(e.target.value)}
  //       />
  //       <button type="submit">LOG IN</button>
  //     </form>

  //     {/* Sign Up Form */}
  //     <form onSubmit={onSignup}>
  //       <div className="title">or Sign Up</div>
  //       <input
  //         type="text"
  //         name="username"
  //         placeholder="Username"
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         name="secret"
  //         placeholder="Password"
  //         onChange={(e) => setSecret(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         name="email"
  //         placeholder="Email"
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         name="first_name"
  //         placeholder="First name"
  //         onChange={(e) => setFirstName(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         name="last_name"
  //         placeholder="Last name"
  //         onChange={(e) => setLastName(e.target.value)}
  //       />
  //       <button type="submit">SIGN UP</button>
  //     </form>
  //   </div>

  //   <style>{`
  //   .login-page { width: 100vw; height: 100vh; padding-top: 6vw; background: linear-gradient(180deg, rgba(117,84,160,1) 7%, rgba(117,84,160,1) 17%, rgba(106,95,168,1) 29%, rgba(99,103,174,1) 44%, rgba(87,116,184,1) 66%, rgba(70,135,198,1) 83%, rgba(44,163,219,1) 96%, rgba(22,188,237,1) 100%, rgba(0,212,255,1) 100%); }
  //   .card { width: 200px; position: relative; left: calc(50vw - 100px); text-align: center; }
  //   .title { padding-top: 32px; font-size: 22px; color: white; font-weight: 700; }
  //   input { width: calc(100% - 16px); margin-top: 12px; padding: 8px; background-color: #e6f7ff; outline: none; border: 1px solid #e6f7ff; }
  //   button { margin-top: 12px; width: 100%; padding: 8px; }
  //   `}</style>
  // </div>
}

export default LOGIN;
