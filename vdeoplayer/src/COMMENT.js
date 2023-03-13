import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./COMENT.css";

const COMMENT = () => {

    const PARAM = useParams();
    console.log(PARAM);

    const [USERCOMMENT, setUSERCOMMENT] = useState("");
    const [USERCOMET, setUSERCOMET] = useState([]);

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
        <div className="form-group shadow-textarea">
            <label for="exampleFormControlTextarea6">Write Comment</label>
            <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="2" placeholder="Write something here..." style={{ width: "100%" }} onChange={(e) => setUSERCOMMENT(e.target.value)}></textarea>
            <button type="button" class="btn btn-primary" style={{ marginLeft: "0%" }} onClick={() => USERCOMMENTFUNCTION(PARAM.id)}>Comment</button>
        </div>
        {
            USERCOMET.map((value, i) => {
                if (value.USERVIDEOID == PARAM.id) {
                    return <><br />
                        <div class="row">
                            <div class="column">
                                <div className="user-cards-container">
                                    <div className="user-card" style={{ height: "3%", width: "100%", marginRight: "20%" }}><br />
                                        <div className="user-info">
                                            <h5 key={i}>{value.USERCOMMENT}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            })
        }
    </>
}
export default COMMENT;