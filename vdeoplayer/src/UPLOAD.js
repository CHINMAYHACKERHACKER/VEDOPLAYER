import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UPLOADIMAGE.css";

const UPLOAD = () => {
    const [TITLE, setTITLE] = useState("");
    const [VIDEO, setVIDEO] = useState("");
    const [USERUNIQUEID, setUSERUNIQUEID] = useState("");
    const [NOISEREDUCE, setNOISEREDUCE] = useState("");
    const [AUDIO, setAUDIO] = useState("");
    const [USERAUDIO, setUSERAUDIO] = useState("");
    const [USERSTATUSDATA, setUSERSTATUSDATA] = useState([]);
    const [USERLOGINDATA, setUSERLOGINDATA] = useState([]);
    const [USERID, setUSERID] = useState("");

    console.log(NOISEREDUCE);
    console.log(VIDEO);

    const METHOD = (e) => {
        e.preventDefault();
        if (TITLE === "" || VIDEO === "") {
            alert("Please fill all fields");
        } else {
            const FORMDATA = new FormData();
            FORMDATA.append("TITLE", TITLE);
            FORMDATA.append("USERUNIQUEID", USERID);
            FORMDATA.append("NOISEREDUCE", NOISEREDUCE);
            FORMDATA.append("AUDIO", AUDIO);
            FORMDATA.append("USERAUDIO", USERAUDIO);
            for (let i = 0; i < VIDEO.length; i++) {
                FORMDATA.append("VIDEO", VIDEO[i]);
            }

            axios.post(`${process.env.REACT_APP_BACKEND_URL}/VIDEO`, FORMDATA);
            alert(
                "Video Uploaded! Please wait until the upload process is complete. Once it's uploaded, you will see your videos in the 'Uploaded Videos' tab."
            );
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERFOLLOWUSERDATA`).then((RES) => {
            console.log("USERFOLLOWUSERDATA", RES.data);
            setUSERSTATUSDATA(RES.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERLOGIN`).then((RES) => {
            console.log("USERLOGIN", RES.data);
            setUSERLOGINDATA(RES.data);
        });
        setUSERID(localStorage.getItem("USERGENERATEDID"));
    }, []);

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <div className="container-fluid">
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white fixed-top">
                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={toggleNavbar}
                            style={{
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px',
                                background: 'transparent',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <span
                                className="navbar-toggler-icon"
                                style={{
                                    position: 'relative',
                                    width: '20px',
                                    height: '2px',
                                    backgroundColor: '#000',
                                    borderRadius: '2px',
                                    display: 'block'
                                }}
                            />
                            <span
                                className="navbar-toggler-icon"
                                style={{
                                    position: 'absolute',
                                    top: '8px',
                                    width: '20px',
                                    height: '2px',
                                    backgroundColor: '#000',
                                    borderRadius: '2px',
                                    display: 'block'
                                }}
                            />
                            <span
                                className="navbar-toggler-icon"
                                style={{
                                    position: 'absolute',
                                    top: '16px',
                                    width: '20px',
                                    height: '2px',
                                    backgroundColor: '#000',
                                    borderRadius: '2px',
                                    display: 'block'
                                }}
                            />
                        </button>
                        <div
                            className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/VIDEO">
                                        Videos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/VIDEOUPLOAD">
                                        Your Videos (Like, Comment, and Views)
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/UPLOADEDVIDEO">
                                        Uploaded Videos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ABOUT">
                                        Guidelines
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/CONTACT">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header><br /><br />

            <main className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        <h2>Upload Video</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="video">Select Video:</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    multiple
                                    onChange={(e) => setVIDEO(e.target.files)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Video Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    maxLength={67}
                                    placeholder="Enter Forty Five Char"
                                    onChange={(e) => setTITLE(e.target.value)}
                                    required
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="noiseReduce">Only Noise Reduction:</label>
                                <select
                                    className="form-control"
                                    onChange={(e) => setNOISEREDUCE(e.target.value)}
                                >
                                    <option>Select Option</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div> */}
                            {/* <div className="form-group">
                                <label htmlFor="audio">
                                    Noise Reduction + Background Music:
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) => setAUDIO(e.target.value)}
                                >
                                    <option>Select Option</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div> */}
                            {/* <div className="form-group">
                                <label htmlFor="userAudio">Only Background Music:</label>
                                <select
                                    className="form-control"
                                    onChange={(e) => setUSERAUDIO(e.target.value)}
                                >
                                    <option>Select Option</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </div> */}
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={METHOD}
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UPLOAD;
