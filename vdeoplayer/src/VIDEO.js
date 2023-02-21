import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../src/VIDEO.css";

const VIDEO = () => {

    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [ADVIDEOLIST, setADVIDEOLIST] = useState([]);
    const [SEARCH, setSEARCH] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [showAd, setShowAd] = useState(true);
    const [USERIMAGE, setUSERIMAGE] = useState([]);


    const shouldShowAd = () => currentTime >= 10 && showAd;

    const METHOD = async () => {
        await axios.get("http://localhost:3001/USERVIDEOVIDEO")
            .then((RES) => {
                console.log(RES);
                setUSERVIDEOLIST(RES.data);
            })
    }

    const ADMETHOD = async (id) => {
        await axios.get(`http://localhost:3001/ADVIDEO/${id}`)
            .then((RES) => {
                console.log(RES);
                setADVIDEOLIST(RES.data);
            })
    }

    const closeAd = () => {
        setShowAd(false);
    };

    const USERIMAGEDATA = async () => {
        await axios.get("http://localhost:3001/USERDATA")
            .then((RES) => {
                console.log(RES);
                setUSERIMAGE(RES.data);
            })
    }

    useEffect(() => {
        METHOD();
        ADMETHOD();
        USERIMAGEDATA();
    }, [])


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
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/FILE">Chat</Link>
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
                    </ul>
                </div>
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search Videos" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
                </div>
            </div>
        </nav>


        {
            USERVIDEOLIST.filter((value) => {
                if (SEARCH == "") {
                    return value;
                }
                else if (value.TITLE.toLowerCase().includes(SEARCH.toLowerCase())) {
                    return value;
                }

            }).map((value, index) => (

                <div class="container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <div class="video">
                        <video src={`http://localhost:3001/${value.VIDEO}`} type="video/mp4" style={{ width: "70%" }} controls></video>
                    </div>
                    <div class="text">
                        {
                            USERIMAGE.map((val, i) => {
                                return <>
                                    <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" />
                                   <h4 key={i}>Uploaded By:{val.FIRSTNAME} {val.LASTNAME}</h4>
                                </>
                            })
                        }
                        <p style={{ marginRight: "100%" }}><h5>Title:</h5><h6>{value.TITLE}</h6></p>
                    </div>
                </div>
            ))
        }
    </>
}
export default VIDEO;
