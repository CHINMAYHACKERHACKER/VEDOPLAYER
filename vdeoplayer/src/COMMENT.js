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
        setUSERCOLOR("red");
    }
    const USERCHANGECOLOR = () => {
        if (STATUS == "Following") {
            setUSERCOLOR("red")
        }
        else {
            setUSERCOLOR("black");
        }
    }

    const METHOD = () => {
        setSTATUS("Following")
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
                            <Link className="nav-link text-white" to="/VIDEO">Videos</Link>
                        </li>
                    </ul>
                </div>
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search Videos" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
                </div>
            </div>
        </nav>
        <video src={`http://localhost:3001/VIDEO/${PARAM.VIDEOID}`} type="video/mp4" style={{ width: "70%", border: "5px solid white", marginLeft: "0%", backgroundColor: "black" }} controls></video>
        <button type="button" class="btn btn-primary" style={{ marginLeft: "-69%", marginTop: "5%", backgroundColor: USERCOLOR, borderColor: "black", width: "10%" }} onMouseOver={ONCHANGECOLOR} onMouseOut={USERCHANGECOLOR} onClick={METHOD}>{STATUS}</button><br />
        {/* <div className="form-group shadow-textarea">
            <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="2" placeholder="Write something here..." style={{ width: "70%", marginLeft: "0%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea>
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID)}>Comment</button> <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => FULLWINDOWPOPUP(PARAM.ID)}>View Comments</button>
        </div> */}
        <div className="md-form mb-3 pink-textarea active-pink-textarea"><br />
            <textarea id="form18" className="md-textarea form-control" rows="1" placeholder="Write Comment..." style={{ width: "70%", marginLeft: "0%", borderColor: "white", height: "5%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea><br />
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID)}>Comment</button> <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => FULLWINDOWPOPUP(PARAM.ID)}>View Comments</button>
        </div>
        <div className="" style={{ height: '18rem', width: '18rem', marginLeft: '75%', marginTop: "-76%" }}>
        </div>
        <VIDEOCOMMENT value={SEARCH}/>
    </>
}
export default COMMENT;