import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./COMENT.css";
import VIDEOCOMMENT from "./VIDEOCOMMENT.js";


const COMMENT = () => {
    const [USERCOMMENT, setUSERCOMMENT] = useState("");
    const [STATUS, setSTATUS] = useState("Follow");
    const [USERCOLOR, setUSERCOLOR] = useState("black");
    const [SEARCH, setSEARCH] = useState("");
    const [USERVIDEO, setUSERVIDEO] = useState([]);
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [USERFOLLOW, setUSERFOLLOW] = useState(0);
    const [USERSUBSCRIBE, setUSERSUBSCRIBE] = useState("Subscribe");


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

    const METHOD = (USERUIQUEID, USERID, VIDEO, VIDEOID, id, ID, FIRSTNAME, LASTNAME) => {
        if (USERUIQUEID == USERID && VIDEO == `VIDEO/${VIDEOID}` && id == ID) {
            setSTATUS("Following");
            setUSERFOLLOW(USERFOLLOW+1);
            alert("You Started Following"+" "+FIRSTNAME+" "+LASTNAME);
        }
        else{
            setSTATUS("Follow");
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3001/VIDEOINFORMATION")
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
                            <Link className="nav-link text-white" to="/VIDEO">Videos</Link>
                        </li>
                    </ul>
                </div>
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search Videos" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
                </div>
            </div>
        </nav>
        <video src={`http://localhost:3001/VIDEO/${PARAM.VIDEOID}`} type="video/mp4" style={{ width: "60%", border: "5px solid white", marginLeft: "-0%", backgroundColor: "black" }} controls></video>
        {
            USERVIDEO.map((val, i) => {
                return USERVIDEOLIST.map((value, i) => {
                    if (val.USERUIQUEID == value.USERID && value.VIDEO == `VIDEO/${PARAM.VIDEOID}` && value.id == PARAM.ID) {
                        return <>
                            {/* <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginTop: "35%", borderRadius: "50%", width: "60px", height: "60px" }} /> */}
                            <h6 key={i}>{val.FIRSTNAME} {val.LASTNAME}</h6>
                            <p style={{ marginRight: "100%" }}><h6>{value.TITLE}</h6></p>
                            <button type="button" class="btn btn-primary" style={{ marginLeft: "0.3%", marginTop: "-1.5%", width: "7%" }} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={() => METHOD(val.USERUIQUEID, value.USERID, value.VIDEO, PARAM.VIDEOID, value.id, PARAM.ID)}>{USERSUBSCRIBE}</button><i class="bi bi-person-fill" style={{ marginLeft: "1%", fontSize: "39px"}} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={() => METHOD(val.USERUIQUEID, value.USERID, value.VIDEO, PARAM.VIDEOID, value.id, PARAM.ID, val.FIRSTNAME,val.LASTNAME)}></i><br />
                            <p style={{ marginLeft: "-71%", marginTop: "-2.5%" }}>{STATUS}</p> <p style={{ marginLeft: "-63%", marginTop: "-3%" }}>{USERFOLLOW}</p>
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
        <div className="" style={{ height: '18rem', width: '18rem', marginLeft: '79%', marginTop: "-77%" }}>
        </div>
        <VIDEOCOMMENT value={SEARCH} />
    </>
}
export default COMMENT;