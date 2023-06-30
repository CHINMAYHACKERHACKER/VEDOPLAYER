import React, { useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./COMENT.css";
import VIDEOCOMMENT from "./VIDEOCOMMENT.js";
import "./USERCOMMENT.css";
import JoLPlayer from "jol-player";

const COMMENT = () => {
    const [USERCOMMENT, setUSERCOMMENT] = useState("");
    const [STATUS, setSTATUS] = useState("Like");
    const [USERCOLOR, setUSERCOLOR] = useState("black");
    const [SEARCH, setSEARCH] = useState("");
    const [USERVIDEO, setUSERVIDEO] = useState([]);
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [USERFOLLOW, setUSERFOLLOW] = useState(0);
    const [USERSUBSCRIBE, setUSERSUBSCRIBE] = useState("Subscribe");
    const [USERSTAUS, setUSERSTAUS] = useState([]);
    const [COUNT, setCOUNT] = useState([]);
    const [SONG, setSONG] = useState([]);
    const [STATUSFOLLOW, setSTATUSFOLLOW] = useState("Follow");
    const [USERFOLLOWDATA, setUSERFOLLOWDATA] = useState([]);
    const [USERUNIQUEID, setUSERUNIQUEID] = useState([]);
    const [VIDEODATA, setVIDEODATA] = useState([]);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    console.log("VIDEODATA", VIDEODATA);
    console.log("USERVIDEO", USERVIDEO);
    console.log("USERVIDEOLIST", USERVIDEOLIST);

    const PARAM = useParams();
    console.log("PARAM", PARAM);

    const NAVIGATE = useNavigate();


    const qualityOptions = [
        { value: '1080p', label: '1080p' },
        { value: '720p', label: '720p' },
        { value: '480p', label: '480p' },
    ];


    const USERCOMMENTFUNCTION = (ID, USERID, VIDEOFIVE) => {
        if (USERCOMMENT == "") {
            alert("Please Write Comment");
        }
        else if (PARAM.USERID == USERID) {
            USERID = USERUNIQUEID;
            axios.post(`http://localhost:3001/USERCOMMENT`, {
                ID: ID,
                USERCOMMENT: USERCOMMENT,
                USERID: USERID,
                VIDEOFIVE: VIDEOFIVE,
                PARAMID: PARAM.USERID
            })
            alert("Your Comment Posted Sucessfully");
            window.location.reload();
        }
    }

    function FULLWINDOWPOPUP(ID) {
        window.open(`${process.env.REACT_APP_FRONTEND_URL}/USERCOMMENT/${ID}`, "bfs", "fullscreen,scrollbars");
    }

    const ONCHANGECOLOR = () => {
        setUSERCOLOR("blue");
    }
    const USERCHANGECOLOR = () => {
        if (STATUS == "Following") {
            setUSERCOLOR("blue")
        }
        else {
            setUSERCOLOR("black");
        }
    }

    const METHOD = (USERGENERATEDID, USERID, VIDEO, VIDEOONE, id, ID, USERNAME, VIDEOFIVE) => {
        if (USERGENERATEDID == USERID && VIDEO == `VIDEO/${VIDEOONE}` && id == ID) {
            // alert("You Started Following" + " " + USERNAME);
            axios.post(`http://localhost:3001/STATUS`, {
                id: id,
                USERNAME: USERNAME,
                STATUS: STATUS,
                USERGENERATEDID: USERGENERATEDID,
                VIDEOFIVE: VIDEOFIVE
            })
        }
        else if (USERGENERATEDID == USERID && VIDEO == `VIDEONOISEREDUCE/${VIDEOONE}` && id == ID) {
            alert("You Started Following" + " " + USERNAME);
            axios.post(`http://localhost:3001/STATUS`, {
                id: id,
                USERNAME: USERNAME,
                STATUS: STATUS,
                USERGENERATEDID: USERGENERATEDID,
                VIDEOFIVE: VIDEOFIVE
            })
        }
        else {
            setSTATUS("Follow");
        }
        window.location.reload();
    }



    //USERFOLLOWFUNCTION
    const USERFOLLOWFUNCTION = (USERGENERATEDID, USERID, VIDEO, VIDEOONE, id, ID, USERNAME) => {
        if (USERGENERATEDID == USERID && VIDEO == `VIDEO/${VIDEOONE}` && id == ID) {
            USERGENERATEDID = USERUNIQUEID;
            alert("You Started Following" + " " + USERNAME);
            axios.post(`http://localhost:3001/FOLLOWSTATUS`, {
                id: id,
                USERNAME: USERNAME,
                STATUSFOLLOW: STATUSFOLLOW,
                USERGENERATEDID: USERGENERATEDID,
                USERID: USERID,
            })
        }
        else if (USERGENERATEDID == USERID && VIDEO == `VIDEONOISEREDUCE/${VIDEOONE}` && id == ID) {
            USERGENERATEDID = USERUNIQUEID;
            axios.post(`http://localhost:3001/FOLLOWSTATUS`, {
                id: id,
                USERNAME: USERNAME,
                STATUSFOLLOW: STATUSFOLLOW,
                USERGENERATEDID: USERGENERATEDID,
                USERID: USERID,
            })
        }
        else {
            setSTATUSFOLLOW("Follow");
        }
        window.location.reload();
    }

    function METHODFUNCTION(e) {
        e.preventDefault();
        // window.location.reload();
        // window.location.pathname = '/VIDEO';
        NAVIGATE("/VIDEO");
    }

    function SUBSCRIBEFUNCTION() {
        alert("For now This Feature Is Not Available");
    }



    useEffect(() => {
        axios.get(`http://localhost:3001/USERIMAGEDATA`)
            .then((RES) => {
                console.log("USERVIDEO", RES.data);
                setUSERVIDEO(RES.data);
            })
    }, [])


    useEffect(() => {
        axios.get(`http://localhost:3001/USERVIDEOLISTINFORMATION`)
            .then((RES) => {
                console.log("USERVIDEOLIST", RES.data);
                setUSERVIDEOLIST(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3001/STATUS`)
            .then((RES) => {
                console.log("STATUS", RES.data);
                setUSERSTAUS(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3001/USERCOUNTSTATUS`)
            .then((RES) => {
                console.log("COUNT", RES.data);
                setCOUNT(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3001/FOLLOWSTATUS`)
            .then((RES) => {
                console.log("COUNT", RES.data);
                setUSERFOLLOWDATA(RES.data);
            })
    }, [])



    useEffect(() => {
        setUSERUNIQUEID(localStorage.getItem("USERGENERATEDID"));
    }, [])


    const videoRef = useRef(null);
    const [theme, setTheme] = useState("#ffb821");
    const [isShowMultiple, setIsShowMultiple] = useState(true);

    const onProgressMouseUp = (val) => {
        console.log("onProgressMouseUp", val);
    };
    const onEndEd = (val) => {
        console.log("onEndEd", val);
    };
    const onPause = (val) => {
        console.log("onPause", val);
    };
    const onProgressMouseDown = (val) => {
        console.log("onProgressMouseDown", val);
    };
    const onPlay = (val) => {
        console.log("onPlay", val);
    };
    const onTimeChange = (val) => {
        console.log("onTimeChange", val);
        setVIDEODATA(Math.floor(val.currentTime));
    };
    const onvolumechange = (val) => {
        console.log("onvolumechange", val);
    };
    const onError = () => {
        console.log("onError");
    };
    const onQualityChange = (val) => {
        console.log("onQualityChange", val);
    };

    useEffect(() => {
        console.log("videoRef.current", videoRef.current);
    }, [videoRef.current]);

    const videoMethod = (status) => {
        if (status === "play") {
            videoRef.current.play();
        } else if (status === "pause") {
            videoRef.current.pause();
        } else if (status === "load") {
            videoRef.current.load();
        } else if (status === "volume") {
            videoRef.current.setVolume(86);
        } else if (status === "seek") {
            videoRef.current.seek(500);
        }
    };


    if (PARAM.VIDEONOISEREDUCE == "yes") {
        const toggle = () => {
            videoRef.current.setVideoSrc(
                `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`
            );
        };
    }
    else {
        const toggle = () => {
            videoRef.current.setVideoSrc(
                `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`
            );
        };

    }

    if (PARAM.VIDEOMUSIC == "yes") {
        const toggle = () => {
            videoRef.current.setVideoSrc(
                `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`
            );
        };
    }
    else {
        const toggle = () => {
            videoRef.current.setVideoSrc(
                `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`
            );
        };

    }

    if (VIDEODATA == 29) {
        axios.post(`http://localhost:3001/USERVIEWDATA`, {
            ID: PARAM.ID,
            USERID: PARAM.USERID,
            VIDEOFIVE: PARAM.VIDEOFIVE,
            USERUNIQUEID: USERUNIQUEID,
        })
    }


    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white fixed-top">
            <div className="container-fluid">
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
                </button><br/><br/>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {/* <Link className="nav-link text-white" aria-current="page" to="/HOME">Home</Link> */}
                        </li>
                        {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={FUNCTION}>Chat</Link>
              </li> */}
                        <li className="nav-item">
                            {/* <Link className="nav-link" to="/HOME">Home</Link> */}
                        </li>
                        {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/VIDEO" onClick={METHODFUNCTION}>Videos</Link>
                        </li>
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
            </div>
        </nav><br /><br /><br /><br />

        {
            PARAM.VIDEONOISEREDUCE === "yes" ? (
                <JoLPlayer
                    ref={videoRef}
                    onProgressMouseUp={onProgressMouseUp}
                    onEndEd={onEndEd}
                    onPause={onPause}
                    onProgressMouseDown={onProgressMouseDown}
                    onPlay={onPlay}
                    onTimeChange={onTimeChange}
                    onvolumechange={onvolumechange}
                    onError={onError}
                    onQualityChange={onQualityChange}
                    option={{
                        videoSrc: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`,
                        theme,
                        width: "100%", // Set width to 100% for responsiveness
                        height: "auto", // Let height adjust automatically
                        language: "en",
                        isShowMultiple,
                        pausePlacement: "center",
                        quality: [
                            {
                                name: "BD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOONE}`
                            },
                            {
                                name: "FHD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTWO}`
                            },
                            {
                                name: "HD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTHREE}`
                            },
                            {
                                name: "SD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`
                            }
                        ]
                    }}
                    style={{
                        width: "100%", // Set width to 100% for responsiveness
                        paddingBottom: "56.25%", // Maintain 16:9 aspect ratio (adjust if needed)
                        position: "relative",
                        border: "5px solid white",
                        backgroundColor: "black",
                        objectFit: "cover",
                        maxWidth: "100%" // Limit the max width to prevent it from becoming too big on web
                    }}
                />
            ) : PARAM.VIDEOMUSIC === "yes" ? (
                <JoLPlayer
                    ref={videoRef}
                    onProgressMouseUp={onProgressMouseUp}
                    onEndEd={onEndEd}
                    onPause={onPause}
                    onProgressMouseDown={onProgressMouseDown}
                    onPlay={onPlay}
                    onTimeChange={onTimeChange}
                    onvolumechange={onvolumechange}
                    onError={onError}
                    onQualityChange={onQualityChange}
                    option={{
                        videoSrc: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`,
                        theme,
                        width: "100%", // Set width to 100% for responsiveness
                        height: "auto", // Let height adjust automatically
                        language: "en",
                        isShowMultiple,
                        pausePlacement: "center",
                        quality: [
                            {
                                name: "BD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOONE}`
                            },
                            {
                                name: "FHD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTWO}`
                            },
                            {
                                name: "HD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTHREE}`
                            },
                            {
                                name: "SD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`
                            }
                        ]
                    }}
                    style={{
                        width: "100%", // Set width to 100% for responsiveness
                        paddingBottom: "56.25%", // Maintain 16:9 aspect ratio (adjust if needed)
                        position: "relative",
                        border: "5px solid white",
                        backgroundColor: "black",
                        objectFit: "cover",
                        maxWidth: "100%" // Limit the max width to prevent it from becoming too big on web
                    }}
                />) : PARAM.USERAUDIO === "yes" ? (
                    <JoLPlayer
                        ref={videoRef}
                        onProgressMouseUp={onProgressMouseUp}
                        onEndEd={onEndEd}
                        onPause={onPause}
                        onProgressMouseDown={onProgressMouseDown}
                        onPlay={onPlay}
                        onTimeChange={onTimeChange}
                        onvolumechange={onvolumechange}
                        onError={onError}
                        onQualityChange={onQualityChange}
                        option={{
                            videoSrc: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`,
                            theme,
                            width: "100%", // Set width to 100% for responsiveness
                            height: "auto", // Let height adjust automatically
                            language: "en",
                            isShowMultiple,
                            pausePlacement: "center",
                            quality: [
                                {
                                    name: "BD",
                                    url: `http://localhost:3001/VIDEO/${PARAM.VIDEOONE}`
                                },
                                {
                                    name: "FHD",
                                    url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTWO}`
                                },
                                {
                                    name: "HD",
                                    url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTHREE}`
                                },
                                {
                                    name: "SD",
                                    url: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`
                                }
                            ]
                        }}
                        style={{
                            width: "100%", // Set width to 100% for responsiveness
                            paddingBottom: "56.25%", // Maintain 16:9 aspect ratio (adjust if needed)
                            position: "relative",
                            border: "5px solid white",
                            backgroundColor: "black",
                            objectFit: "cover",
                            maxWidth: "100%" // Limit the max width to prevent it from becoming too big on web
                        }}
                    />) : (
                <JoLPlayer
                    ref={videoRef}
                    onProgressMouseUp={onProgressMouseUp}
                    onEndEd={onEndEd}
                    onPause={onPause}
                    onProgressMouseDown={onProgressMouseDown}
                    onPlay={onPlay}
                    onTimeChange={onTimeChange}
                    onvolumechange={onvolumechange}
                    onError={onError}
                    onQualityChange={onQualityChange}
                    option={{
                        videoSrc: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`,
                        theme,
                        width: "100%", // Set width to 100% for responsiveness
                        height: "auto", // Let height adjust automatically
                        language: "en",
                        isShowMultiple,
                        pausePlacement: "center",
                        quality: [
                            {
                                name: "BD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOONE}`
                            },
                            {
                                name: "FHD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTWO}`
                            },
                            {
                                name: "HD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOTHREE}`
                            },
                            {
                                name: "SD",
                                url: `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`
                            }
                        ]
                    }}
                    style={{
                        width: "100%", // Set width to 100% for responsiveness
                        paddingBottom: "56.25%", // Maintain 16:9 aspect ratio (adjust if needed)
                        position: "relative",
                        border: "5px solid white",
                        backgroundColor: "black",
                        objectFit: "cover",
                        maxWidth: "100%" // Limit the max width to prevent it from becoming too big on web
                    }}
                />
            )
        }

        {/* <video src={`http://localhost:3001/VIDEO/${PARAM.VIDEOID}`} type="video/mp4" quality="100" style={{ width: "60%", border: "5px solid white", marginLeft: "-0%", backgroundColor: "black" }} controls></video> */}

        {PARAM.VIDEONOISEREDUCE == "yes" ? (
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEONOISEREDUCE/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                        return <>
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                    <h5 style={{ marginRight: "10px" }}>{value.TITLE}</h5>
                                    {/* <i
                                        className="fa-solid fa-heart"
                                        style={{ fontSize: "20px", marginTop: "-0%" }}
                                        onMouseOver={ONCHANGECOLOR}
                                        onMouseOut={USERCHANGECOLOR}
                                        onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                    ></i>
                                    {USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}></p>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        });
                                    })} */}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                    <img
                                        className="user-img"
                                        src={`http://localhost:3001/${val.IMAGE}`}
                                        alt="User"
                                        style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }}
                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h6 style={{ marginTop: "-2%" }}>{val.USERNAME}</h6>
                                        {USERFOLLOWDATA.map((VAL, I) => {
                                            if (VAL.USERID === PARAM.ID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                        <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                        <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                    <i
                                        className="fa-solid fa-heart"
                                        style={{ fontSize: "20px", marginTop: "1%", marginLeft: "13%" }}
                                        onMouseOver={ONCHANGECOLOR}
                                        onMouseOut={USERCHANGECOLOR}
                                        onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                    ></i>
                                    {USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                        <p style={{ marginRight: "10px", marginTop: "50%" }}></p>
                                                        <p style={{ marginRight: "10px", marginTop: "50%" }}>{VALUE.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        });
                                    })}
                                </div>

                                <div className="d-flex justify-content-start">
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill"
                                        style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", marginRight: "10px", flex: "1" }}
                                        onClick={SUBSCRIBEFUNCTION}
                                    >
                                        {USERSUBSCRIBE}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill"
                                        style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", flex: "1" }}
                                        onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}
                                    >
                                        Follow
                                    </button>
                                    {/* {USERFOLLOWDATA.map((VAL, I) => {
                                        if (VAL.USERID === PARAM.ID) {
                                            return (
                                                <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                    <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                    <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                </div>
                                            );
                                        }
                                    })} */}
                                </div>
                            </div>
                        </>
                    }
                })
            })
        ) : PARAM.VIDEOMUSIC == "yes" ? (
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEONOISEREDUCE/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                        return <>
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                    <h5 style={{ marginRight: "10px" }}>{value.TITLE}</h5>
                                    {/* <i
                                        className="fa-solid fa-heart"
                                        style={{ fontSize: "20px", marginTop: "-0%" }}
                                        onMouseOver={ONCHANGECOLOR}
                                        onMouseOut={USERCHANGECOLOR}
                                        onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                    ></i>
                                    {USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}></p>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        });
                                    })} */}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                    <img
                                        className="user-img"
                                        src={`http://localhost:3001/${val.IMAGE}`}
                                        alt="User"
                                        style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }}
                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h6 style={{ marginTop: "-2%" }}>{val.USERNAME}</h6>
                                        {USERFOLLOWDATA.map((VAL, I) => {
                                            if (VAL.USERID === PARAM.ID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                        <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                        <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                    <i
                                        className="fa-solid fa-heart"
                                        style={{ fontSize: "20px", marginTop: "1%", marginLeft: "13%" }}
                                        onMouseOver={ONCHANGECOLOR}
                                        onMouseOut={USERCHANGECOLOR}
                                        onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                    ></i>
                                    {USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                        <p style={{ marginRight: "10px", marginTop: "50%" }}></p>
                                                        <p style={{ marginRight: "10px", marginTop: "50%" }}>{VALUE.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        });
                                    })}
                                </div>

                                <div className="d-flex justify-content-start">
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill"
                                        style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", marginRight: "10px", flex: "1" }}
                                        onClick={SUBSCRIBEFUNCTION}
                                    >
                                        {USERSUBSCRIBE}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill"
                                        style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", flex: "1" }}
                                        onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}
                                    >
                                        Follow
                                    </button>
                                    {/* {USERFOLLOWDATA.map((VAL, I) => {
                                        if (VAL.USERID === PARAM.ID) {
                                            return (
                                                <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                    <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                    <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                </div>
                                            );
                                        }
                                    })} */}
                                </div>
                            </div>
                        </>
                    }
                })
            })) : PARAM.USERAUDIO == "yes" ? (
                USERVIDEO.map((val, i) => {
                    return USERVIDEOLIST.map((value, i) => {
                        if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEONOISEREDUCE/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                            return <>
                                <div style={{ marginBottom: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                        <h5 style={{ marginRight: "10px" }}>{value.TITLE}</h5>
                                        {/* <i
                                        className="fa-solid fa-heart"
                                        style={{ fontSize: "20px", marginTop: "-0%" }}
                                        onMouseOver={ONCHANGECOLOR}
                                        onMouseOut={USERCHANGECOLOR}
                                        onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                    ></i>
                                    {USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}></p>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        });
                                    })} */}
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                        <img
                                            className="user-img"
                                            src={`http://localhost:3001/${val.IMAGE}`}
                                            alt="User"
                                            style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }}
                                        />
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <h6 style={{ marginTop: "-2%" }}>{val.USERNAME}</h6>
                                            {USERFOLLOWDATA.map((VAL, I) => {
                                                if (VAL.USERID === PARAM.ID) {
                                                    return (
                                                        <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                            <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                            <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                        <i
                                            className="fa-solid fa-heart"
                                            style={{ fontSize: "20px", marginTop: "1%", marginLeft: "13%" }}
                                            onMouseOver={ONCHANGECOLOR}
                                            onMouseOut={USERCHANGECOLOR}
                                            onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                        ></i>
                                        {USERSTAUS.map((VAL, I) => {
                                            return COUNT.map((VALUE, INDEX) => {
                                                if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                    return (
                                                        <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                            <p style={{ marginRight: "10px", marginTop: "50%" }}></p>
                                                            <p style={{ marginRight: "10px", marginTop: "50%" }}>{VALUE.USERCOUNT}</p>
                                                        </div>
                                                    );
                                                }
                                            });
                                        })}
                                    </div>

                                    <div className="d-flex justify-content-start">
                                        <button
                                            type="button"
                                            className="btn btn-primary rounded-pill"
                                            style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", marginRight: "10px", flex: "1" }}
                                            onClick={SUBSCRIBEFUNCTION}
                                        >
                                            {USERSUBSCRIBE}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary rounded-pill"
                                            style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", flex: "1" }}
                                            onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}
                                        >
                                            Follow
                                        </button>
                                        {/* {USERFOLLOWDATA.map((VAL, I) => {
                                        if (VAL.USERID === PARAM.ID) {
                                            return (
                                                <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                    <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                    <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                </div>
                                            );
                                        }
                                    })} */}
                                    </div>
                                </div>
                            </>
                        }
                    })
                })
            ) : (
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEO/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                        return <>
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                    <h5 style={{ marginRight: "10px" }}>{value.TITLE}</h5>
                                    {/* <i
                                        className="fa-solid fa-heart"
                                        style={{ fontSize: "20px", marginTop: "-0%" }}
                                        onMouseOver={ONCHANGECOLOR}
                                        onMouseOut={USERCHANGECOLOR}
                                        onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                    ></i>
                                    {USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}></p>
                                                        <p style={{ marginRight: "10px", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        });
                                    })} */}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                                    <img
                                        className="user-img"
                                        src={`http://localhost:3001/${val.IMAGE}`}
                                        alt="User"
                                        style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }}
                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h6 style={{ marginTop: "-2%" }}>{val.USERNAME}</h6>
                                        {USERFOLLOWDATA.map((VAL, I) => {
                                            if (VAL.USERID === PARAM.ID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                        <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                        <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                    <i
                                        className="fa-solid fa-heart"
                                        style={{ fontSize: "20px", marginTop: "1%", marginLeft: "13%" }}
                                        onMouseOver={ONCHANGECOLOR}
                                        onMouseOut={USERCHANGECOLOR}
                                        onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}
                                    ></i>
                                    {USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID === PARAM.ID && VAL.USERID === VALUE.USERID) {
                                                return (
                                                    <div style={{ display: "flex", alignItems: "center" }} key={INDEX}>
                                                        <p style={{ marginRight: "10px", marginTop: "50%" }}></p>
                                                        <p style={{ marginRight: "10px", marginTop: "50%" }}>{VALUE.USERCOUNT}</p>
                                                    </div>
                                                );
                                            }
                                        });
                                    })}
                                </div>

                                <div className="d-flex justify-content-start">
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill"
                                        style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", marginRight: "10px", flex: "1" }}
                                        onClick={SUBSCRIBEFUNCTION}
                                    >
                                        {USERSUBSCRIBE}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill"
                                        style={{ backgroundColor: "black", borderColor: "black", marginTop: "10px", flex: "1" }}
                                        onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}
                                    >
                                        Follow
                                    </button>
                                    {/* {USERFOLLOWDATA.map((VAL, I) => {
                                        if (VAL.USERID === PARAM.ID) {
                                            return (
                                                <div style={{ display: "flex", alignItems: "center" }} key={I}>
                                                    <p style={{ marginRight: "10px", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p>
                                                    <p style={{ marginRight: "10px", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p>
                                                </div>
                                            );
                                        }
                                    })} */}
                                </div>
                            </div>
                        </>
                    }
                })
            })
        )}

        {/* <div className="form-group shadow-textarea">
            <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="2" placeholder="Write something here..." style={{ width: "70%", marginLeft: "0%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea>
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID)}>Comment</button> <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => FULLWINDOWPOPUP(PARAM.ID)}>View Comments</button>
        </div> */}
        <div className="md-form mb-3 pink-textarea active-pink-textarea">
            <textarea
                id="form18"
                className="md-textarea form-control"
                rows="1"
                placeholder="Write Comment..."
                style={{
                    width: "100%",
                    borderColor: "white",
                    resize: "none", // Disable textarea resizing
                }}
                onChange={(e) => setUSERCOMMENT(e.target.value)}
            ></textarea>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                }}
            >
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => USERCOMMENTFUNCTION(PARAM.ID, PARAM.USERID, PARAM.VIDEOFIVE)}
                >
                    Comment
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => FULLWINDOWPOPUP(PARAM.ID)}
                >
                    View Comments
                </button>
            </div>
        </div>

        {/* <div className="" style={{ height: '18rem', width: '18rem', marginLeft: '50%', marginTop: "-80%" }}>
        </div> */}
        <VIDEOCOMMENT value={SEARCH} />
    </>
}
export default COMMENT;