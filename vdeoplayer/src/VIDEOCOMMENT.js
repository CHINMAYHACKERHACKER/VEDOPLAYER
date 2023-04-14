import { React, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VIDEOCOMMENT.css";


const VIDEOCOMMENT = (props) => {
    console.log(props);
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [USERIMAGE, setUSERIMAGE] = useState([]);

    console.log("USERIMAGE", USERIMAGE);
    console.log("USERVIDEOLIST", USERVIDEOLIST);

    const NAVIGATE = useNavigate();


    const METHOD = async () => {
        await axios.get("http://localhost:3001/USERVIDEOVIDEO")
            .then((RES) => {
                console.log(RES);
                setUSERVIDEOLIST(RES.data);
            })
    }


    const USERIMAGEDATA = async () => {
        await axios.get("http://localhost:3001/USERIMAGEDATA")
            .then((RES) => {
                console.log(RES);
                setUSERIMAGE(RES.data);
            })
    }



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

    useEffect(() => {
        METHOD();
        USERIMAGEDATA();
    }, [])


    return <>
        <div className="container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div className="video"><br />
                <div className="row">
                    <div className="col-5 col-md-5 sidebar" style={{ height: "600px", overflowY: "scroll" }}>
                        <ul className="nav flex-column">
                            {
                                USERVIDEOLIST.filter((value) => {
                                    if (props.value == "") {
                                        return value;
                                    }
                                    else if (value.TITLE.toLowerCase().includes(props.value.toLowerCase())) {
                                        return value;
                                    }
                                }).map((value, index) => (
                                    <li className="nav-item" key={index}><br/>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <video src={`http://localhost:3001/${value.VIDEOFIVE}`} type="video/mp4" style={{ width: "30%", border: "5px solid white", marginLeft: "0%", marginTop: "0%" }} onClick={() => VIDEOFUNCTION(value.id, value.USERID, value.VIDEOONE, value.VIDEOTWO, value.VIDEOTHREE, value.VIDEOFIVE, value.VIDEONOISEREDUCE, value.VIDEOMUSIC, value.USERAUDIO)}></video>
                                            {
                                                USERIMAGE.map((val, i) => {
                                                    if (val.USERGENERATEDID === value.USERID) {
                                                        return (
                                                            <div key={i} style={{ marginLeft: "30%", marginTop: "-9%" }}>
                                                                <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ borderRadius: "50%", width: "25px", height: "25px", marginLeft: "-80px" }} />
                                                                <h5 style={{ marginLeft: "-39px"}}>{val.USERNAME}</h5>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <p><h6 style={{marginRight: "-29%", marginTop: "-7%"}}>{value.TITLE.substring(0, 40)}</h6></p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default VIDEOCOMMENT;