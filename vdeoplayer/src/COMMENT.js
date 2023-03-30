import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./COMENT.css";
import VIDEOCOMMENT from "./VIDEOCOMMENT.js";
import ReactPlayer from 'react-player/youtube'
import "./USERCOMMENT.css";
import videojs from "video.js";
import "videojs-resolution-switcher";
import "video.js/dist/video-js.css";
import "videojs-resolution-switcher/lib/videojs-resolution-switcher.css";
import "videojs-resolution-switcher/lib/videojs-resolution-switcher.js";
import "videojs-resolution-switcher/lib/videojs-resolution-switcher.css";

const COMMENT = () => {
    const [USERCOMMENT, setUSERCOMMENT] = useState("");
    const [STATUS, setSTATUS] = useState("Follow");
    const [USERCOLOR, setUSERCOLOR] = useState("black");
    const [SEARCH, setSEARCH] = useState("");
    const [USERVIDEO, setUSERVIDEO] = useState([]);
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [USERFOLLOW, setUSERFOLLOW] = useState(0);
    const [USERSUBSCRIBE, setUSERSUBSCRIBE] = useState("Subscribe");
    const [USERSTAUS, setUSERSTAUS] = useState([]);
    const [COUNT, setCOUNT] = useState([]);
    const [SONG, setSONG] = useState([]);

    console.log("USERVIDEO", USERVIDEO);
    console.log("USERVIDEOLIST", USERVIDEOLIST);

    const PARAM = useParams();
    console.log("PARAM", PARAM);


    const USERCOMMENTFUNCTION = (ID) => {
        if (USERCOMMENT == "") {
            alert("Please Write Comment");
        }
        else {
            axios.post(`http://localhost:3001/USERCOMMENT`, {
                ID: ID,
                USERCOMMENT: USERCOMMENT,
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

    const METHOD = (USERGENERATEDID, USERID, VIDEO, VIDEOID, id, ID, USERNAME) => {
        if (USERGENERATEDID == USERID && VIDEO == `VIDEO/${VIDEOID}` && id == ID) {
            setUSERFOLLOW(USERFOLLOW + 1);
            alert("You Started Following" + " " + USERNAME);
            axios.post("http://localhost:3001/STATUS", {
                id: id,
                USERNAME: USERNAME,
                STATUS: STATUS,
                USERGENERATEDID: USERGENERATEDID
            })
        }
        else {
            setSTATUS("Follow");
        }
        window.location.reload();
    }

    function METHODFUNCTION(e) {
        e.preventDefault();
        window.location.reload();
        window.location.pathname = '/VIDEO';
    }

    useEffect(() => {
        axios.get("http://localhost:3001/USERIMAGEDATA")
            .then((RES) => {
                console.log(RES.data);
                setUSERVIDEO(RES.data);
            })
    }, [])


    useEffect(() => {
        axios.get("http://localhost:3001/USERVIDEOLISTINFORMATION")
            .then((RES) => {
                console.log(RES.data);
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
                console.log("USERCOUNTSTATUS", RES.data);
                setCOUNT(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/USERSONG")
            .then((RES) => {
                console.log("USERSONG", RES.data);
                setSONG(RES.data);
            })
    }, [])

    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) {
            return;
        }

        const player = videojs(videoElement, {
            controls: true,
            plugins: {
                videoJsResolutionSwitcher: {
                    default: "low", // Default resolution [{Number}, 'low', 'high'],
                    dynamicLabel: true,
                },
            },
        });

        player.updateSrc([
            {
                src: `http://localhost:3001/VIDEO/${PARAM.VIDEOID}?SD`,
                type: "video/mp4",
                label: "SD",
                res: 480,
            },
            {
                src: `http://localhost:3001/VIDEO/${PARAM.VIDEOID}?HD`,
                type: "video/mp4",
                label: "HD",
                res: 1080,
            },
            {
                src: `http://localhost:3001/VIDEO/${PARAM.VIDEOID}?phone`,
                type: "video/mp4",
                label: "phone",
                res: 144,
            },
            {
                src: `http://localhost:3001/VIDEO/${PARAM.VIDEOID}?4k`,
                type: "video/mp4",
                label: "4k",
                res: 2160,
            }
        ])

        player.on("resolutionchange", function () {
            console.info("Source changed to %s", player.src());
        })

        return () => {
            player.dispose();
        };
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
                            <Link className="nav-link text-white" to="/HOME">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/VIDEO" onClick={METHODFUNCTION}>Videos</Link>
                        </li>
                    </ul>
                </div>
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search Videos" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
                </div>
            </div>
        </nav>
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-default-skin" controls>
                <p className="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to
                    a web browser that
                    <a href="https://videojs.com/html5-video-support/" target="_blank">
                        supports HTML5 video
                    </a>
                </p>
            </video>
        </div>
        {/* <video src={`http://localhost:3001/VIDEO/${PARAM.VIDEOID}`} type="video/mp4" quality="100" style={{ width: "60%", border: "5px solid white", marginLeft: "-0%", backgroundColor: "black" }} controls></video> */}
        {
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERGENERATEDID == value.USERID && value.VIDEO == `VIDEO/${PARAM.VIDEOID}` && value.id == PARAM.ID) {
                        return <>
                            {/* <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "35%", borderRadius: "50%", width: "60px", height: "60px" }} /> */}
                            <h6 key={i}>{val.USERNAME}</h6>
                            <p style={{ marginRight: "100%" }}><h6>{value.TITLE}</h6></p>
                            <button type="button" class="btn btn-primary" style={{ marginLeft: "0.3%", marginTop: "-1.5%", width: "7%", backgroundColor: "black", borderColor: "black" }}>{USERSUBSCRIBE}</button>
                            <i class="bi bi-person-fill" style={{ marginLeft: "1%", fontSize: "39px" }} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={() => METHOD(val.USERGENERATEDID, value.USERID, value.VIDEO, PARAM.VIDEOID, value.id, PARAM.ID, val.USERNAME)}></i><br />
                            {
                                USERSTAUS.map((VAL, I) => {
                                    return COUNT.map((VALUE, INDEX) => {
                                        if (VAL.USERID == PARAM.ID && VAL.USERID == VALUE.USERID) {
                                            return <>
                                                <p style={{ marginLeft: "-71%", marginTop: "-2.5%" }}>{VAL.STATUS}</p> <p style={{ marginLeft: "-63%", marginTop: "-3%" }}>{VALUE.USERCOUNT}</p><br />
                                            </>
                                        }
                                    })

                                })
                            }
                            <h5 style={{ marginLeft: "-93%" }} >Listen</h5>
                            {
                                SONG.map((VALUE, INDEX) => {
                                    if (`VIDEO/${VALUE.USERVIDEO}` == `VIDEO/${PARAM.VIDEOID}`) {
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
        }
        {/* <div className="form-group shadow-textarea">
            <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="2" placeholder="Write something here..." style={{ width: "70%", marginLeft: "0%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea>
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID)}>Comment</button> <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => FULLWINDOWPOPUP(PARAM.ID)}>View Comments</button>
        </div> */}
        <div className="md-form mb-3 pink-textarea active-pink-textarea"><br />
            <textarea id="form18" className="md-textarea form-control" rows="1" placeholder="Write Comment..." style={{ width: "50%", marginLeft: "0%", borderColor: "white", height: "5%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea><br />
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID)}>Comment</button> <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => FULLWINDOWPOPUP(PARAM.ID)}>View Comments</button>
        </div>
        <div className="" style={{ height: '18rem', width: '18rem', marginLeft: '79%', marginTop: "-73%" }}>
        </div>
        <VIDEOCOMMENT value={SEARCH} />
    </>
}
export default COMMENT;