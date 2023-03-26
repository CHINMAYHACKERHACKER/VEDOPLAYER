import React from "react";
import { useState } from "react";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LOG.css";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const USERHOMELOGIN = () => {
    const [USERNAME, setUSERNAME] = useState();
    const [PASSWORD, setPASSWORD] = useState();
    const [USER, setUSER] = useState("");
    const [USERPASSWORD, setUSERPASSWORD] = useState("");
    const [EMAIL, setEMAIL] = useState();
    const [IMAGE, setIMAGE] = useState("");
    const [USERGENERATEDID, setUSERGENERATEDID] = useState("");
    const [USERLOGIN, setUSERLOGIN] = useState([]);

    const passwordHintId = uuidv4();
    console.log("passwordHintId", passwordHintId);

    const NAVIGATE=useNavigate();

    const onLogin = (e) => {
        e.preventDefault();
        USERLOGIN.map((value,i)=>{
            if(value.USERNAME==USER && value.PASSWORD==USERPASSWORD){
                return NAVIGATE("/HOME");
            }
            else{
                return document.getElementById("PARAGRAPH").innerHTML="Wrong Credentials";
            }
        })
    }

    const onSignup = (e) => {
        const FORMDATA = new FormData();
        FORMDATA.append("USERNAME", USERNAME);
        FORMDATA.append("PASSWORD", PASSWORD);
        FORMDATA.append("EMAIL", EMAIL);
        FORMDATA.append("IMAGE", IMAGE);
        FORMDATA.append("USERGENERATEDID", USERGENERATEDID);
        axios
            .post("http://localhost:3001/USERSIGNUP", FORMDATA);
        alert("You have signed up");
    }

    const USERGENERATE = () => {
        setUSERGENERATEDID(passwordHintId);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/USERLOGIN")
            .then((RES) => {
                console.log(RES.data);
                setUSERLOGIN(RES.data);
            })
},[])

    return <>
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
                               <p id="PARAGRAPH" style={{ color: "red" }}></p>
                                <div className="tab-content">
                                    <div id="login" className="tab-pane active">
                                        <form onSubmit={onLogin}>
                                            <div className="form-group">
                                                <label for="email">Username:</label>
                                                <input type="text" className="form-control" placeholder="Enter Username" onChange={(e) => setUSER(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label for="pwd">Password:</label>
                                                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setUSERPASSWORD(e.target.value)} />
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "1%" }}>Login</button>
                                        </form>
                                    </div>
                                    <div id="signup" className="tab-pane">
                                        <form onSubmit={onSignup}>
                                            <div className="form-group">
                                                <label for="name">Username:</label>
                                                <input type="text" className="form-control" placeholder="Enter name" onChange={(e) => setUSERNAME(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label for="email">Password:</label>
                                                <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => setPASSWORD(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label for="pwd">Email:</label>
                                                <input type="email" className="form-control" placeholder="Enter Email" onChange={(e) => setEMAIL(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label for="pwd">Click To Generate Id(Save your Unique Id):</label>
                                                <input type="text" className="form-control" value={USERGENERATEDID} required /><button type="button" className="btn btn-primary" style={{ marginLeft: "1%" }} onClick={USERGENERATE}>Generate</button>
                                            </div>
                                            <div className="form-group">
                                                <label for="pwd">Upload Your Image:</label>
                                                <input type="file" className="form-control" onChange={(e) => setIMAGE(e.target.files[0])} required />
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{ marginLeft: "1%" }}>Sign Up</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
}

export default USERHOMELOGIN;