import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./COMENT.css";
import VIDEOCOMMENT from "./VIDEOCOMMENT.js";
import "./USERCOMMENT.css";
import JoLPlayer, { callBackType, JoLPlayerRef, qualityKey } from "jol-player";
import { Button, Input, Switch } from "antd";
import { FilterChain } from 'react-ffmpeg';
import FFMPEG from "react-ffmpeg";



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

    console.log("VIDEODATA", VIDEODATA);
    console.log("USERVIDEO", USERVIDEO);
    console.log("USERVIDEOLIST", USERVIDEOLIST);

    const PARAM = useParams();
    console.log("PARAM", PARAM);

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
        window.open(`http://localhost:3000/USERCOMMENT/${ID}`, "bfs", "fullscreen,scrollbars");
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
            axios.post("http://localhost:3001/STATUS", {
                id: id,
                USERNAME: USERNAME,
                STATUS: STATUS,
                USERGENERATEDID: USERGENERATEDID,
                VIDEOFIVE: VIDEOFIVE
            })
        }
        else if (USERGENERATEDID == USERID && VIDEO == `VIDEONOISEREDUCE/${VIDEOONE}` && id == ID) {
            alert("You Started Following" + " " + USERNAME);
            axios.post("http://localhost:3001/STATUS", {
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
            axios.post("http://localhost:3001/FOLLOWSTATUS", {
                id: id,
                USERNAME: USERNAME,
                STATUSFOLLOW: STATUSFOLLOW,
                USERGENERATEDID: USERGENERATEDID,
                USERID: USERID,
            })
        }
        else if (USERGENERATEDID == USERID && VIDEO == `VIDEONOISEREDUCE/${VIDEOONE}` && id == ID) {
            USERGENERATEDID = USERUNIQUEID;
            axios.post("http://localhost:3001/FOLLOWSTATUS", {
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
        window.location.reload();
        window.location.pathname = '/VIDEO';
    }

    function SUBSCRIBEFUNCTION() {
        alert("For now This Feature Is Not Available");
    }



    useEffect(() => {
        axios.get("http://localhost:3001/USERIMAGEDATA")
            .then((RES) => {
                console.log("USERVIDEO", RES.data);
                setUSERVIDEO(RES.data);
            })
    }, [])


    useEffect(() => {
        axios.get("http://localhost:3001/USERVIDEOLISTINFORMATION")
            .then((RES) => {
                console.log("USERVIDEOLIST", RES.data);
                setUSERVIDEOLIST(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/STATUS")
            .then((RES) => {
                console.log("STATUS", RES.data);
                setUSERSTAUS(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/USERCOUNTSTATUS")
            .then((RES) => {
                console.log("COUNT", RES.data);
                setCOUNT(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/FOLLOWSTATUS")
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

    if (VIDEODATA == 25) {
        axios.post("http://localhost:3001/USERVIEWDATA", {
            ID: PARAM.ID,
            USERID: PARAM.USERID,
            VIDEOFIVE: PARAM.VIDEOFIVE,
            USERUNIQUEID: USERUNIQUEID,
        })
    }


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
        </nav><br /><br />


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
                        videoSrc:
                            `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`,
                        theme,
                        width: "50%",
                        height: "50%",
                        language: "en",
                        isShowMultiple,
                        pausePlacement: "center",
                        quality: [
                            {
                                name: "BD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOONE}`
                            },
                            {
                                name: "FHD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOTWO}`
                            },
                            {
                                name: "HD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOTHREE}`
                            },
                            {
                                name: "SD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`
                            }
                        ]
                    }}
                    style={{ width: "59%", paddingBottom: "26%", position: "relative", border: "5px solid white", backgroundColor: "black", objectFit: "cover" }} />
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
                        videoSrc:
                            `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`,
                        theme,
                        width: "50%",
                        height: "50%",
                        language: "en",
                        isShowMultiple,
                        pausePlacement: "center",
                        quality: [
                            {
                                name: "BD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOONE}`
                            },
                            {
                                name: "FHD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOTWO}`
                            },
                            {
                                name: "HD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOTHREE}`
                            },
                            {
                                name: "SD",
                                url:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`
                            }
                        ]
                    }}
                    style={{ width: "59%", paddingBottom: "26%", position: "relative", border: "5px solid white", backgroundColor: "black", objectFit: "cover" }} />) : PARAM.USERAUDIO === "yes" ? (
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
                                videoSrc:
                                    `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`,
                                theme,
                                width: "50%",
                                height: "50%",
                                language: "en",
                                isShowMultiple,
                                pausePlacement: "center",
                                quality: [
                                    {
                                        name: "BD",
                                        url:
                                            `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOONE}`
                                    },
                                    {
                                        name: "FHD",
                                        url:
                                            `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOTWO}`
                                    },
                                    {
                                        name: "HD",
                                        url:
                                            `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOTHREE}`
                                    },
                                    {
                                        name: "SD",
                                        url:
                                            `http://localhost:3001/VIDEONOISEREDUCE/${PARAM.VIDEOFIVE}`
                                    }
                                ]
                            }}
                            style={{ width: "59%", paddingBottom: "26%", position: "relative", border: "5px solid white", backgroundColor: "black", objectFit: "cover" }} />) : (
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
                        videoSrc:
                            `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`,
                        theme,
                        width: "50%",
                        height: "50%",
                        language: "en",
                        isShowMultiple,
                        pausePlacement: "center",
                        quality: [
                            {
                                name: "BD",
                                url:
                                    `http://localhost:3001/VIDEO/${PARAM.VIDEOONE}`
                            },
                            {
                                name: "FHD",
                                url:
                                    `http://localhost:3001/VIDEO/${PARAM.VIDEOTWO}`
                            },
                            {
                                name: "HD",
                                url:
                                    `http://localhost:3001/VIDEO/${PARAM.VIDEOTHREE}`
                            },
                            {
                                name: "SD",
                                url:
                                    `http://localhost:3001/VIDEO/${PARAM.VIDEOFIVE}`
                            }
                        ]
                    }}
                    style={{ width: "59%", paddingBottom: "26%", position: "relative", border: "5px solid white", backgroundColor: "black", objectFit: "cover" }} />

            )
        }

        {/* <video src={`http://localhost:3001/VIDEO/${PARAM.VIDEOID}`} type="video/mp4" quality="100" style={{ width: "60%", border: "5px solid white", marginLeft: "-0%", backgroundColor: "black" }} controls></video> */}

        {PARAM.VIDEONOISEREDUCE == "yes" ? (
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEONOISEREDUCE/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                        return <>
                            <p style={{ marginRight: "100%" }}><h5>{value.TITLE}</h5></p><br /><br /><br />
                            <h6 key={i} style={{ marginTop: "0%", marginLeft: "0%" }}>{val.USERNAME}</h6>   <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "-7%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                            <br />
                            {/* <h6 key={i} style={{ marginTop: "0%", marginLeft: "-55%"}}>{val.USERNAME}</h6><br/> */}
                            {/* <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                            <h6 key={i} style={{ marginTop: "2%", marginRight: "5%" }}>{val.USERNAME}</h6><br /><br /> */}
                            <div class="d-flex justify-content-start">
                                <button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "0%", marginTop: "-1%", backgroundColor: "black", borderColor: "black" }} onClick={SUBSCRIBEFUNCTION}>{USERSUBSCRIBE}</button><button type="button" class="btn btn-primary rounded-pill" style={{ backgroundColor: "black", borderColor: "black", marginLeft: "1%", marginTop: "-1%", height: "5%" }} onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}>Follow</button>
                                {/* <i class="fa-solid fa-heart" style={{ marginLeft: "2%", fontSize: "29px", marginTop: "-0%" }} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}></i><br /> */}
                            </div>
                            {
                                USERFOLLOWDATA.map((VAL, I) => {
                                    if (VAL.USERID == PARAM.ID) {
                                        return <>
                                            <p style={{ marginRight: "65%", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p> <p style={{ marginRight: "57%", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p><br />
                                        </>
                                    }
                                })
                            }

                            {
                                USERSTAUS.map((VAL, I) => {
                                    return COUNT.map((VALUE, INDEX) => {
                                        if (VAL.USERID == PARAM.ID && VAL.USERID == VALUE.USERID) {
                                            return <>
                                                <p style={{ marginRight: "80%", marginTop: "-3%" }}></p> <p style={{ marginRight: "75%", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p><br />
                                            </>
                                        }
                                    })

                                })
                            }
                        </>
                    }
                })
            })
        ) : PARAM.VIDEOMUSIC == "yes" ? (
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEONOISEREDUCE/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                        return <>
                            <p style={{ marginRight: "100%" }}><h5>{value.TITLE}</h5></p><br /><br /><br />
                            <h6 key={i} style={{ marginTop: "0%", marginLeft: "0%" }}>{val.USERNAME}</h6>   <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "-7%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                            <br />
                            {/* <h6 key={i} style={{ marginTop: "0%", marginLeft: "-55%"}}>{val.USERNAME}</h6><br/> */}
                            {/* <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                            <h6 key={i} style={{ marginTop: "2%", marginRight: "5%" }}>{val.USERNAME}</h6><br /><br /> */}
                            <div class="d-flex justify-content-start">
                                <button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "0%", marginTop: "-1%", backgroundColor: "black", borderColor: "black" }} onClick={SUBSCRIBEFUNCTION}>{USERSUBSCRIBE}</button><button type="button" class="btn btn-primary rounded-pill" style={{ backgroundColor: "black", borderColor: "black", marginLeft: "1%", marginTop: "-1%", height: "5%" }} onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}>Follow</button>
                                {/* <i class="fa-solid fa-heart" style={{ marginLeft: "2%", fontSize: "29px", marginTop: "-0%" }} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}></i><br /> */}
                            </div>
                            {
                                USERFOLLOWDATA.map((VAL, I) => {
                                    if (VAL.USERID == PARAM.ID) {
                                        return <>
                                            <p style={{ marginRight: "65%", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p> <p style={{ marginRight: "57%", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p><br />
                                        </>
                                    }
                                })
                            }

                            {
                                USERSTAUS.map((VAL, I) => {
                                    return COUNT.map((VALUE, INDEX) => {
                                        if (VAL.USERID == PARAM.ID && VAL.USERID == VALUE.USERID) {
                                            return <>
                                                <p style={{ marginRight: "80%", marginTop: "-3%" }}></p> <p style={{ marginRight: "75%", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p><br />
                                            </>
                                        }
                                    })

                                })
                            }
                        </>
                    }
                })
            })) : PARAM.USERAUDIO == "yes" ? (
                USERVIDEO.map((val, i) => {
                    return USERVIDEOLIST.map((value, i) => {
                        if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEONOISEREDUCE/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                            return <>
                                <p style={{ marginRight: "100%" }}><h5>{value.TITLE}</h5></p><br /><br /><br />
                                <h6 key={i} style={{ marginTop: "0%", marginLeft: "0%" }}>{val.USERNAME}</h6>   <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "-7%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                                <br />
                                {/* <h6 key={i} style={{ marginTop: "0%", marginLeft: "-55%"}}>{val.USERNAME}</h6><br/> */}
                                {/* <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                            <h6 key={i} style={{ marginTop: "2%", marginRight: "5%" }}>{val.USERNAME}</h6><br /><br /> */}
                                <div class="d-flex justify-content-start">
                                    <button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "0%", marginTop: "-1%", backgroundColor: "black", borderColor: "black" }} onClick={SUBSCRIBEFUNCTION}>{USERSUBSCRIBE}</button><button type="button" class="btn btn-primary rounded-pill" style={{ backgroundColor: "black", borderColor: "black", marginLeft: "1%", marginTop: "-1%", height: "5%" }} onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}>Follow</button>
                                    {/* <i class="fa-solid fa-heart" style={{ marginLeft: "2%", fontSize: "29px", marginTop: "-0%" }} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}></i><br /> */}
                                </div>
                                {
                                    USERFOLLOWDATA.map((VAL, I) => {
                                        if (VAL.USERID == PARAM.ID) {
                                            return <>
                                                <p style={{ marginRight: "65%", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p> <p style={{ marginRight: "57%", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p><br />
                                            </>
                                        }
                                    })
                                }

                                {
                                    USERSTAUS.map((VAL, I) => {
                                        return COUNT.map((VALUE, INDEX) => {
                                            if (VAL.USERID == PARAM.ID && VAL.USERID == VALUE.USERID) {
                                                return <>
                                                    <p style={{ marginRight: "80%", marginTop: "-3%" }}></p> <p style={{ marginRight: "75%", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p><br />
                                                </>
                                            }
                                        })

                                    })
                                }
                            </>
                        }
                    })
                })
            ) : (
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERGENERATEDID == value.USERID && value.VIDEOONE == `VIDEO/${PARAM.VIDEOONE}` && value.id == PARAM.ID) {
                        return <>
                            <p style={{ marginRight: "100%" }}><h5>{value.TITLE}</h5></p><br /><br /><br />
                            <h6 key={i} style={{ marginTop: "0%", marginLeft: "0%" }}>{val.USERNAME}</h6>   <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "-7%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                            <br />
                            {/* <h6 key={i} style={{ marginTop: "0%", marginLeft: "-55%"}}>{val.USERNAME}</h6><br/> */}
                            {/* <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", borderRadius: "50%", width: "50px", height: "50px" }} />
                            <h6 key={i} style={{ marginTop: "2%", marginRight: "5%" }}>{val.USERNAME}</h6><br /><br /> */}
                            <div class="d-flex justify-content-start">
                                <button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "0%", marginTop: "-1%", backgroundColor: "black", borderColor: "black" }} onClick={SUBSCRIBEFUNCTION}>{USERSUBSCRIBE}</button><button type="button" class="btn btn-primary rounded-pill" style={{ backgroundColor: "black", borderColor: "black", marginLeft: "1%", marginTop: "-1%", height: "5%" }} onClick={() => USERFOLLOWFUNCTION(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME)}>Follow</button>
                                {/* <i class="fa-solid fa-heart" style={{ marginLeft: "2%", fontSize: "29px", marginTop: "-0%" }} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEOONE, PARAM.VIDEOONE, value.id, PARAM.ID, val.USERNAME, value.VIDEOFIVE)}></i><br /> */}
                            </div>
                            {
                                USERFOLLOWDATA.map((VAL, I) => {
                                    if (VAL.USERID == PARAM.ID) {
                                        return <>
                                            <p style={{ marginRight: "65%", marginTop: "-2%" }}>{VAL.USERFOLLOWSTATUS}</p> <p style={{ marginRight: "57%", marginTop: "-2.9%" }}>{VAL.USERCOUNT}</p><br />
                                        </>
                                    }
                                })
                            }

                            {
                                USERSTAUS.map((VAL, I) => {
                                    return COUNT.map((VALUE, INDEX) => {
                                        if (VAL.USERID == PARAM.ID && VAL.USERID == VALUE.USERID) {
                                            return <>
                                                <p style={{ marginRight: "80%", marginTop: "-3%" }}></p> <p style={{ marginRight: "75%", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p><br />
                                            </>
                                        }
                                    })

                                })
                            }
                            {/* <h5 style={{ marginLeft: "-93%" }} >Listen</h5> */}
                            {
                                SONG.map((VALUE, INDEX) => {
                                    if (`VIDEO/${VALUE.VIDEOONE}` == `VIDEO/${PARAM.VIDEOONE}`) {
                                        return <>
                                            <audio style={{ marginLeft: "0%" }} controls>
                                                <source src={`http://localhost:3001/${VALUE.USERSONG}`} type="audio/mp3" />
                                                Your browser does not support the audio tag.
                                            </audio>
                                        </>
                                    }
                                })
                            }
                        </>
                    }
                })
            })
        )}

        {/* <div className="form-group shadow-textarea">
            <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="2" placeholder="Write something here..." style={{ width: "70%", marginLeft: "0%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea>
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID)}>Comment</button> <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => FULLWINDOWPOPUP(PARAM.ID)}>View Comments</button>
        </div> */}
        <div className="md-form mb-3 pink-textarea active-pink-textarea"><br />
            <textarea id="form18" className="md-textarea form-control" rows="1" placeholder="Write Comment..." style={{ width: "50%", marginLeft: "0%", borderColor: "white", height: "5%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea><br />
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID, PARAM.USERID, PARAM.VIDEOFIVE)}>Comment</button> <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => FULLWINDOWPOPUP(PARAM.ID)}>View Comments</button>
        </div>
        <div className="" style={{ height: '18rem', width: '18rem', marginLeft: '50%', marginTop: "-79%" }}>
        </div>
        <VIDEOCOMMENT value={SEARCH} />
    </>
}
export default COMMENT;