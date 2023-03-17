import { React, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const VIDEOCOMMENT = () => {
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [ADVIDEOLIST, setADVIDEOLIST] = useState([]);
    const [SEARCH, setSEARCH] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [showAd, setShowAd] = useState(true);
    const [USERIMAGE, setUSERIMAGE] = useState([]);
    const [USERLIKE, setUSERLIKE] = useState(0);
    const [USERDISLIKE, setUSERDISLIKE] = useState(0);

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
        await axios.get("http://localhost:3001/USERDATA")
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
                if (SEARCH == "") {
                    return value;
                }
                else if (value.TITLE.toLowerCase().includes(SEARCH.toLowerCase())) {
                    return value;
                }

            }).map((value, index) => (


                <div class="container" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <div class="video"><br />
                        <video src={`http://localhost:3001/${value.VIDEO}`} type="video/mp4" style={{ width: "30%", border: "5px solid white", marginLeft: "75%", marginTop: "0%" }} onClick={() => VIDEOFUNCTION(value.id, value.VIDEO)}></video>
                        {
                            USERIMAGE.map((val, i) => {

                                if (val.USERUIQUEID === value.USERID) {
                                    return <>
                                        <img className="user-img" src={`http://localhost:3001/${val.IMAGE}`} alt="User" style={{ marginLeft: "75%", borderRadius: "50%", width: "39px", height: "39px" }} />
                                        <h5 key={i} style={{ marginLeft: "79%"}}>{val.FIRSTNAME} {val.LASTNAME}</h5>
                                    </>
                                }
                            })
                        }
                        <p style={{ marginLeft: "59%" }}><h6 style={{ marginLeft: "45%" }}>{value.TITLE}</h6></p>
                    </div>
                </div>
            ))
        }
    </>
}
export default VIDEOCOMMENT;