import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./COMENT.css";
import VIDEOCOMMENT from "./VIDEOCOMMENT.js";

const COMMENT = () => {

    const PARAM = useParams();
    console.log("PARAM", PARAM);

    const [USERCOMMENT, setUSERCOMMENT] = useState("");
    const [USERCOMET, setUSERCOMET] = useState([]);
    const [USERLIKE, setUSERLIKE] = useState(0);
    const [USERDISLIKE, setUSERDISLIKE] = useState(0);

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
        axios.get(`http://localhost:3001/USERCOMMENT`)
            .then((RES) => {
                console.log(RES.data);
                setUSERCOMET(RES.data);
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
            </div>
        </nav>
        <video src={`http://localhost:3001/VIDEO/${PARAM.VIDEOID}`} type="video/mp4" style={{ width: "70%", border: "5px solid white", marginLeft: "0%", backgroundColor: "black" }} controls></video>

        <div className="" style={{height: '18rem', width: '18rem', marginLeft: '75%', marginTop: "-63%" }}>
        </div>

        <VIDEOCOMMENT />
        <div className="form-group shadow-textarea">
            <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="2" placeholder="Write something here..." style={{ width: "70%", marginLeft: "0%", marginTop: "-29%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea>
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.ID)}>Comment</button>
        </div>
        <h5 style={{ marginLeft: "-90%", marginTop: "5%" }}>Comments</h5>
        <hr className="hr" style={{ background: 'grey', color: 'grey', borderColor: 'grey', height: '5px', width: '60%' }} />
        {
            USERCOMET.map((value, i) => {
                if (value.USERVIDEOID == PARAM.ID) {
                    return <><br />
                        {/* <div class="row">
                            <div class="column">
                                <div className="user-cards-container">
                                    <div className="user-card" style={{ height: "1%", width: "90%", marginLeft: "-31%", backgroundColor: "grey"}}><br />
                                        <div className="user-info"> */}
                        <h5 key={i} style={{ margin: "0%", display: "inline", color: "grey" }}>{value.USERCOMMENT}</h5> <i style={{ border: '1px solid' }} className="fa fa-thumbs-o-up  fa-border fa-1x bg-blue " onClick={() => USERLIKEFUNCTION(value.id)} />  <i>{USERLIKE[value.id] || 0}</i> <i style={{ border: '1px solid' }} className="fa fa-thumbs-o-down fa-border fa-1x bg-white" onClick={() => USERDISLIKEFUNCTION(value.id)} />  <i>{USERDISLIKE[value.id] || 0}</i><br /><br />
                        {/* </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </>
                }
            })
        }
    </>
}
export default COMMENT;