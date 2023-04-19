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

const VIDEO = () => {

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
    const [USERID, setUSERID] = useState([]);

    console.log("USERIMAGE", USERIMAGE);
    console.log("USERVIDEOLIST", USERVIDEOLIST);

    const shouldShowAd = () => currentTime >= 10 && showAd;

    const NAVIGATE = useNavigate();

    const audio = new Audio(NOTIFICATION);
    const aud = new Audio(NOTIFICATIN);

    let isBellRendered = false;
    let isRendered = false;


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
        await axios.get("http://localhost:3001/USERIMAGEDATA")
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
        axios.get("http://localhost:3001/TOTALUSERCOMMENTBELLSTATUS")
            .then((RES) => {
                console.log("TOTALUSERCOMMENTBELLSTATUS", RES.data);
                setUSERBELLSTATUS(RES.data);
            })
        setUSERLOGINDATA(localStorage.getItem("USERGENERATEDID"));
        setUSERDATACOUNT(localStorage.getItem("USERCOUNTCOUNT"));
    }, [])



    useEffect(() => {
        axios.get("http://localhost:3001/USERDATAFOLLOWSTATUS")
            .then((RES) => {
                console.log("USERFOLLOWSTATUS", RES.data);
                setUSERFOLLOWSTATUS(RES.data);
            })
        setUSERFOLLOWDATA(localStorage.getItem("USERFOLLOWDATA"));
    }, [])


    useEffect(() => {
        axios.get("http://localhost:3001/USERLOGIN")
            .then((RES) => {
                console.log(RES.data);
                setUSERDATACRED(RES.data);
            })
    }, [])

    // const COMMENTFUNCTION = (ID) => {
    //     NAVIGATE(`/COMMENT/${ID}`);
    // }

    const VIDEOFUNCTION = (ID, USERID, VIDEOONE, VIDEOTWO, VIDEOTHREE, VIDEOFIVE, VIDEONOISEREDUCE, VIDEOMUSIC, USERAUDIO) => {
        if (VIDEOMUSIC == "yes") {
            NAVIGATE(`/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${VIDEOMUSIC}/${USERID}/${ID}`);
        }
        else if (VIDEONOISEREDUCE == "yes") {
            NAVIGATE(`/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${VIDEONOISEREDUCE}/${USERID}/${ID}`);
        }
        else if (USERAUDIO == "yes") {
            NAVIGATE(`/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${USERAUDIO}/${USERID}/${ID}`);
        }
        else {
            NAVIGATE(`/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${null}/${USERID}/${ID}`);
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


    // useEffect(() => {
    //     USERFOLLOWSTATUS.map((value) => {
    //       return  USERVIDEOLIST.map((VAL) => {
    //           return  USERDATACRED.map((VALUE) => {
    //                 if (value.USERGENERATEDID == value.USERUSERID && value.USERGENERATEDID !== USERLOGINDATA) {
    //                   return  alert(VALUE.USERNAME + "" + "Uploaded" + "" + VAL.TITLE);
    //                 }
    //             })
    //         })
    //     })
    // }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/USERVIEWDATA")
            .then((RES) => {
                console.log("USERVIEWDATA", RES.data);
                setUSERVIEWVIEW(RES.data);
            })
        setUSERID(localStorage.getItem("USERGENERATEDID"));
    }, [])


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
                            {/* <Link className="nav-link text-white" to="/HOME">Home</Link> */}
                        </li>
                        <li className="nav-item">
                            {/* <Link className="nav-link" to="/FILE">Chat</Link> */}
                        </li>
                        {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
                        {/* <li className="nav-item">
                                <Link className="nav-link text-white" to="/DEV">Users</Link>
                            </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/UPLOAD">Upload Videos</Link>
                        </li>
                    </ul>
                </div>
                <div className="input-group input-group-sm mb-1 rounded-pill" style={{ maxWidth: '500px', marginRight: "29%" }}>
                    <input type="text" className="form-control rounded-start" placeholder="Search Videos" aria-label="Search" aria-describedby="search-button" onChange={(e) => setSEARCH(e.target.value)} />
                </div>
                {/* <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search Videos" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
                </div> */}
                {
                    USERFOLLOWSTATUS.map((value) => {
                        if (value.USERGENERATEDID !== USERLOGINDATA && value.USERUSERID == USERLOGINDATA && !isRendered) { // Check if bell is not already rendered
                            isRendered = true; // Update flag to true
                            localStorage.setItem("USERFOLLOWDATA", value.USERCOUNT);
                            if (value.USERCOUNT == USERFOLLOWDATACOUNT) {
                                aud.pause();
                            }
                            else if (value.USERCOUNT > 0) {
                                aud.play();
                            }
                            return <div>
                                <NotificationBadge count={value.USERCOUNT} class="fa-solid fa-user" effect={Effect.SCALE} style={{ marginRight: "300%" }} /><i class="fa-solid fa-user" id="user-icon" style={{ marginLeft: "-250%" }} onClick={showNames} ></i>
                            </div>
                        }
                        // return USERDATACRED.map((val) => {
                        //     if (USERLOGINDATA !== val.USERGENERATEDID) {
                        //         return <div class="row">
                        //             <div class="column">
                        //                 <div className="user-cards-container">
                        //                     <div className="user-card" id="names-card" style={{ display: 'none', position: "absolute", top: "100%", right: "0", height: "150%", width: "20%" }}>
                        //                         <div className="user-info">
                        //                             <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", width: "50px", height: "50px" }} />
                        //                             <h6 style={{ marginLeft: "33%" }}>{value.USERNAME} Started Following You</h6>
                        //                         </div>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //     }
                        // })
                    })
                }
                {/* <i class="fa-solid fa-bell"> <ToastContainer /></i> */}
                {
                    USERBELLSTATUS.map((value) => {
                        if (value.USERGENERATEDID !== USERLOGINDATA && value.USERPARAMID == USERLOGINDATA && !isBellRendered) { // Check if bell is not already rendered
                            isBellRendered = true; // Update flag to true
                            localStorage.setItem("USERCOUNTCOUNT", value.USERCOUNT);
                            if (value.USERCOUNT == USERDATACOUNT) {
                                audio.pause();
                            }
                            else if (value.USERCOUNT > 0) {
                                audio.play();
                            }
                            return <div>
                                <NotificationBadge count={value.USERCOUNT} class="fa-solid fa-comment" effect={Effect.SCALE} style={{ marginRight: "-35%" }} /><i class="fa-solid fa-comment" style={{ marginLeft: "100%" }} />
                            </div>
                        }
                    })
                }
            </div>
            {
                USERDATACRED.map((val) => {
                    if (USERLOGINDATA == val.USERGENERATEDID) {
                        return <div>
                            <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", width: "30px", height: "30px", marginLeft: "30%" }} />
                        </div>
                    }
                })
            }
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
                    <div class="video"><br />
                        <video src={`http://localhost:3001/${value.VIDEOONE}`} type="video/mp4" style={{ width: "70%", border: "5px solid white" }} onClick={() => VIDEOFUNCTION(value.id, value.USERID, value.VIDEOONE, value.VIDEOTWO, value.VIDEOTHREE, value.VIDEOFIVE, value.VIDEONOISEREDUCE, value.VIDEOMUSIC, value.USERAUDIO)}></video>
                        {
                            USERVIEWVIEW.map((VALUE, i) => {
                                if (VALUE.VIDEOID == value.id) {
                                    return <>
                                        <div>
                                            {/* <i class="fa-solid fa-eye" style={{ fontSize: "15px", marginLeft: "5%" }}> {VALUE.USERCOUNT}</i> */}
                                            <p style={{ marginLeft: "-87%" }}>Views {VALUE.USERCOUNT}</p>
                                        </div>
                                    </>
                                }
                            })
                        }
                        {/* <video src={`http://localhost:3001/${value.VIDEO}`} type="video/mp4" style={{ width: "70%", border: "5px solid white"}} onClick={VIDEOFUNCTION} controls></video> */}

                        {/* <div>
                                        <i style={{ border: '1px solid' }} className="fas fa-thumbs-up fa-border fa-1x bg-white" onClick={() => USERLIKEFUNCTION(value.id)} />  <i className="text-white">{USERLIKE[value.id] || 0}</i> <i style={{ border: '1px solid' }} className="fas fa-thumbs-down fa-border fa-1x bg-white" onClick={() => USERDISLIKEFUNCTION(value.id)} />  <i className="text-white">{USERDISLIKE[value.id] || 0}</i><br />
        
                                        <i style={{ border: '1px solid' }} class="fas fa-comment fa-border fa-1x  bg-white" aria-hidden="true" onClick={() => COMMENTFUNCTION(value.id)}></i>
                                    </div> */}
                    </div>
                    <div class="text">
                        {
                            USERIMAGE.map((val, i) => {
                                if (val.USERGENERATEDID === value.USERID) {
                                    return <>
                                        <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" />
                                        <h4 key={i} >{val.USERNAME}</h4>
                                    </>
                                }
                            })
                        }
                        <p style={{ marginRight: "100%" }}><h6>{value.TITLE}</h6></p>
                    </div>
                </div>
            ))
        }
    </>
}
export default VIDEO;
