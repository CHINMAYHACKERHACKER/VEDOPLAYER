import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const USERCOMMENT = () => {

    const PARAM = useParams();
    const [USERCOMET, setUSERCOMET] = useState([]);
    const [USERLIKE, setUSERLIKE] = useState(0);
    const [USERDISLIKE, setUSERDISLIKE] = useState(0);
    const [USERLOGINDATA, setUSERLOGINDATA] = useState([]);

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
                console.log('USERCOMMENT', RES.data);
                setUSERCOMET(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/USERLOGIN")
            .then((RES) => {
                console.log('USERLOGIN', RES.data);
                setUSERLOGINDATA(RES.data);
            })
    }, [])

    return <>
        {
            USERCOMET.map((value, i) => {
                return USERLOGINDATA.map((VALUE, i) => {
                    if (value.USERVIDEOID == PARAM.ID && value.USERGENERATEDID == VALUE.USERGENERATEDID) {
                        return <><br />
                            {/* <div class="row">
                            <div class="column">
                                <div className="user-cards-container">
                                    <div className="user-card" style={{ height: "1%", width: "90%", marginLeft: "-31%", backgroundColor: "grey"}}><br />
                                        <div className="user-info"> */}
                            <img className="user-img" src={`http://localhost:3001/${VALUE.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", width: "30px", height: "30px", marginLeft: "3%" }}/>
                            <h5 key={i} style={{ margin: "0%", display: "inline", color: "grey" }}><i style={{ color: "black" }}>{VALUE.USERNAME}:{value.USERCOMMENT}</i></h5><br /><br />
                            {/* <i style={{ border: '1px solid' }} className="fa fa-thumbs-o-up  fa-border fa-1x bg-blue " onClick={() => USERLIKEFUNCTION(value.id)} />  <i>{USERLIKE[value.id] || 0}</i> <i style={{ border: '1px solid' }} className="fa fa-thumbs-o-down fa-border fa-1x bg-white" onClick={() => USERDISLIKEFUNCTION(value.id)} />  <i>{USERDISLIKE[value.id] || 0}</i><br /><br /> */}
                            {/* </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        </>
                    }
                })
            })
        }
    </>
}
export default USERCOMMENT;