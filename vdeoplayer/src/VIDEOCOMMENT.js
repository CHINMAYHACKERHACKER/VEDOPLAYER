import { React, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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


    const VIDEOFUNCTION = (ID, VIDEO) => {
        NAVIGATE(`/COMMENT/${VIDEO}/${ID}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        METHOD();
        USERIMAGEDATA();
    }, [])


    return <>

        {
            USERVIDEOLIST.filter((value) => {
                if (props.value == "") {
                    return value;
                }
                else if (value.TITLE.toLowerCase().includes(props.value.toLowerCase())) {
                    return value;
                }
            }).map((value, index) => (
                <div class="container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <div class="video"><br/>
                        <video src={`http://localhost:3001/${value.VIDEO}`} type="video/mp4" style={{ width: "15%", border: "5px solid white", marginLeft: "63%", marginTop: "0%" }} onClick={() => VIDEOFUNCTION(value.id, value.VIDEO)}></video>
                        {
                            USERIMAGE.map((val, i) => {

                                if (val.USERGENERATEDID === value.USERID) {
                                    return <>
                                        <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginLeft: "79%", marginTop: "-9%", borderRadius: "50%", width: "39px", height: "39px" }} />
                                        <h5 key={i} style={{ marginLeft: "77%" , marginTop: "-7%"}}>{val.USERNAME}</h5>
                                    </>
                                }
                            })
                        }
                        <p style={{ marginLeft: "50%" }}><h6 style={{ marginLeft: "57%"}}>{value.TITLE.substring(0,40)}</h6></p>
                    </div>
                </div>
            ))
        }
    </>
}
export default VIDEOCOMMENT;