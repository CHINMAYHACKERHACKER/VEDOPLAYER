import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../src/VIDEO.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import NOTIFICATION from "../src/NOTIFICATION.mp3";
import NOTIFICATIN from "../src/NOTIFICATIONBELL.mp3";

const HOMEVIDEO = () => {

    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [ADVIDEOLIST, setADVIDEOLIST] = useState([]);
    const [SEARCH, setSEARCH] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [showAd, setShowAd] = useState(true);
    const [USERIMAGE, setUSERIMAGE] = useState([]);
    const [USERLIKE, setUSERLIKE] = useState(0);
    const [USERDISLIKE, setUSERDISLIKE] = useState(0);
    const [COMENT, setCOMENT] = useState(0);
    const [USERCOUNT, setUSERCOUNT] = useState(0);
    const [USERLOGINDATA, setUSERLOGINDATA] = useState([]);
    const [USERBELLSTATUS, setUSERBELLSTATUS] = useState([]);
    const [USERFOLLOWSTATUS, setUSERFOLLOWSTATUS] = useState([]);
    const [USERDATACRED, setUSERDATACRED] = useState([]);
    const [USERDATACOUNT, setUSERDATACOUNT] = useState([]);
    const [USERFOLLOWDATACOUNT, setUSERFOLLOWDATA] = useState([]);
    const [USERVIEWVIEW, setUSERVIEWVIEW] = useState([]);


    console.log("USERIMAGE", USERIMAGE);
    console.log("USERVIDEOLIST", USERVIDEOLIST);

    const shouldShowAd = () => currentTime >= 10 && showAd;

    const NAVIGATE = useNavigate();

    const audio = new Audio(NOTIFICATION);
    const aud = new Audio(NOTIFICATIN);

    let isBellRendered = false;
    let isRendered = false;


    const METHOD = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERVIDEOVIDEO`)
            .then((RES) => {
                console.log(RES);
                setUSERVIDEOLIST(RES.data);
            })
    }

    const ADMETHOD = async (id) => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/ADVIDEO/${id}`)
            .then((RES) => {
                console.log(RES);
                setADVIDEOLIST(RES.data);
            })
    }

    const closeAd = () => {
        setShowAd(false);
    };

    const USERIMAGEDATA = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERIMAGEDATA`)
            .then((RES) => {
                console.log(RES);
                setUSERIMAGE(RES.data);
            })
    }

    const USERLIKEFUNCTION = (videoId) => {
        setUSERLIKE((prevLikes) => ({
            ...prevLikes,
            [videoId]: (prevLikes[videoId] || 0) + 1,
        }));
        localStorage.setItem('USERLIKE', JSON.stringify(USERLIKE));
    };

    const USERDISLIKEFUNCTION = (videoId) => {
        setUSERDISLIKE((prevLikes) => ({
            ...prevLikes,
            [videoId]: (prevLikes[videoId] || 0) + 1,
        }));
        localStorage.setItem('USERDISLIKE', JSON.stringify(USERDISLIKE));
    };

    useEffect(() => {
        const storedLikes = localStorage.getItem('USERLIKE');
        if (storedLikes) {
            setUSERLIKE(JSON.parse(storedLikes));
        }
    }, []);

    useEffect(() => {
        const storedLikes = localStorage.getItem('USERDISLIKE');
        if (storedLikes) {
            setUSERDISLIKE(JSON.parse(storedLikes));
        }
    }, []);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/TOTALUSERCOMMENTBELLSTATUS`)
            .then((RES) => {
                console.log("TOTALUSERCOMMENTBELLSTATUS", RES.data);
                setUSERBELLSTATUS(RES.data);
            })
        setUSERLOGINDATA(localStorage.getItem("USERGENERATEDID"));
        setUSERDATACOUNT(localStorage.getItem("USERCOUNTCOUNT"));
    }, [])



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERDATAFOLLOWSTATUS`)
            .then((RES) => {
                console.log("USERFOLLOWSTATUS", RES.data);
                setUSERFOLLOWSTATUS(RES.data);
            })
        setUSERFOLLOWDATA(localStorage.getItem("USERFOLLOWDATA"));
    }, [])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERLOGIN`)
            .then((RES) => {
                console.log(RES.data);
                setUSERDATACRED(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERVIEWDATA`)
            .then((RES) => {
                console.log("USERVIEWDATA", RES.data);
                setUSERVIEWVIEW(RES.data);
            })
    }, [])

    // const COMMENTFUNCTION = (ID) => {
    //     NAVIGATE(`/COMMENT/${ID}`);
    // }

    const VIDEOFUNCTION = (ID, USERID, VIDEOONE, VIDEOTWO, VIDEOTHREE, VIDEOFIVE, VIDEONOISEREDUCE, VIDEOMUSIC, USERAUDIO) => {
        if (VIDEOMUSIC == "yes") {
            NAVIGATE(`/HOMEVIDEOVIDEO/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${VIDEOMUSIC}/${USERID}/${ID}`);
        }
        else if (VIDEONOISEREDUCE == "yes") {
            NAVIGATE(`/HOMEVIDEOVIDEO/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${VIDEONOISEREDUCE}/${USERID}/${ID}`);
        }
        else if (USERAUDIO == "yes") {
            NAVIGATE(`/HOMEVIDEOVIDEO/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${USERAUDIO}/${USERID}/${ID}`);
        }
        else {
            NAVIGATE(`/HOMEVIDEOVIDEO/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${null}/${USERID}/${ID}`);
        }
        window.scrollTo(0, 0);
    }

    const USERDATA = (USERUIQUEID, USERID, IMAGE, FIRSTNAME, LASTNAME) => {
        console.log("USERUIQUEID", USERUIQUEID);
        console.log("USERID", USERID);
        console.log("IMAGE", IMAGE);
        console.log("FIRSTNAME", FIRSTNAME);
        console.log("LASTNAME", LASTNAME);
    }

    function showNames() {
        const namesList = document.getElementById('names-card');
        console.log("NAMELIST", namesList);
        if (namesList.style.display === 'none') {
            namesList.style.display = 'block';
        } else {
            namesList.style.display = 'none';
        }
    }

    const SIGN = () => {
        NAVIGATE("/USERHOMELOGIN");
    }

    useEffect(() => {
        METHOD();
        USERIMAGEDATA();
        // notify();
    }, [])

    return <>

        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white fixed-top">
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
                            {/* <Link className="nav-link " to="/">Home</Link> */}
                        </li>

                        <li className="nav-item">
                            {/* <Link className="nav-link text-white" to="/FILE">Chat</Link> */}
                        </li>
                        {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
                        {/* <li className="nav-item">
                                <Link className="nav-link text-white" to="/DEV">Users</Link>
                            </li> */}
                        <li className="nav-item">
                            {/* <Link className="nav-link text-white" to="/UPLOAD">Upload Videos</Link> */}
                        </li>
                    </ul>
                </div>
                <div className="input-group input-group-sm mb-1 rounded-pill" style={{ maxWidth: '500px', marginRight: "25%" }}>
                    <input type="text" className="form-control rounded-start" placeholder="Search Videos" aria-label="Search" aria-describedby="search-button" onChange={(e) => setSEARCH(e.target.value)} />
                </div>
                <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={SIGN}>Sign Up</button>
                {/* <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search Videos" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
                </div> */}
            </div>
        </nav><br/><br/><br/><br/><br/>
        <div className="container">
            <div className="row">
                {USERVIDEOLIST.filter((value) => {
                    if (SEARCH === '') {
                        return value;
                    } else if (value.TITLE.toLowerCase().includes(SEARCH.toLowerCase())) {
                        return value;
                    }
                }).map((value, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="video" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <video
                                src={`${process.env.REACT_APP_BACKEND_URL}/${value.VIDEOONE}`}
                                type="video/mp4"
                                style={{ width: '100%', border: '5px solid white' }}
                                onClick={() =>
                                    VIDEOFUNCTION(
                                        value.id,
                                        value.USERID,
                                        value.VIDEOONE,
                                        value.VIDEOTWO,
                                        value.VIDEOTHREE,
                                        value.VIDEOFIVE,
                                        value.VIDEONOISEREDUCE,
                                        value.VIDEOMUSIC,
                                        value.USERAUDIO
                                    )
                                }
                            />
                        </div>
                        <div className="text" style={{ textAlign: 'center' }}>
                            {USERIMAGE.map((val, i) => {
                                if (val.USERGENERATEDID === value.USERID) {
                                    return (
                                        <>
                                            <img
                                                className="user-img"
                                                src={`${process.env.REACT_APP_BACKEND_URL}/${val.IMAGE}`}
                                                alt="User"
                                            />
                                            <h4 style={{ marginRight: '20%' }}>{val.USERNAME}</h4>
                                        </>
                                    );
                                }
                            })}
                            <p>
                                <h6>{value.TITLE}</h6>
                            </p>
                        </div>
                        {USERVIEWVIEW.map((VALUE, i) => {
                            if (VALUE.VIDEOID == value.id) {
                                return (
                                    <div key={i}>
                                        <p style={{ marginLeft: '-10%' }}>Views {VALUE.USERCOUNT}</p>
                                    </div>
                                );
                            }
                        })}
                    </div>
                ))}
            </div>
        </div>

    </>
}

export default HOMEVIDEO;