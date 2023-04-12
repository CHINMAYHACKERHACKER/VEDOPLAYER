import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const VIDEOUPLOAD = () => {
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [USERLOGINDATA, setUSERLOGINDATA] = useState([]);
    const [USERFOLLOWSTATUS, setUSERFOLLOWSTATUS] = useState([]);
    const [USERCOMMENTSTATUS, setUSERCOMMENTSTATUS] = useState([]);

    function FULLWINDOWPOPUP(ID) {
        window.open(`http://localhost:3000/USERCOMMENT/${ID}`, "bfs", "fullscreen,scrollbars");
    }


    useEffect(() => {
        axios.get("http://localhost:3001/USERVIDEOVIDEO")
            .then((RES) => {
                console.log("USERVIDEOVIDEO", RES.data);
                setUSERVIDEOLIST(RES.data);
            })
        setUSERLOGINDATA(localStorage.getItem("USERGENERATEDID"));
    }, [])


    useEffect(() => {
        axios.get("http://localhost:3001/USERFOLLOWSTATUS")
            .then((RES) => {
                console.log("USERFOLLOWSTATUS", RES.data);
                setUSERFOLLOWSTATUS(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/USERCOMMENTBELLSTATUS")
            .then((RES) => {
                console.log("USERCOMMENTBELLSTATUS", RES.data);
                setUSERCOMMENTSTATUS(RES.data);
            })
    }, [])

    return <>

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Videos</th>
                    <th scope="col">Likes</th>
                    <th scope="col">Comments</th>
                </tr>
            </thead>
            {
                USERVIDEOLIST.map((value, index) => {
                    return USERFOLLOWSTATUS.map((val, index) => {
                        return USERCOMMENTSTATUS.map((VALUE, index) => {
                            if (value.USERID === USERLOGINDATA && val.USERGENERATEID === USERLOGINDATA && VALUE.USERGENERATEDID === USERLOGINDATA && value.VIDEOFIVE === val.USERVIDEO && value.VIDEOFIVE == `VIDEO/${VALUE.USERCOMMENTVIDEO}`){
                                return <>
                                    <tbody>
                                        <tr>
                                            <td> <video src={`http://localhost:3001/${value.VIDEOFIVE}`} type="video/mp4" style={{ width: "25%", marginLeft: "-0%" }}></video> <button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "5%", marginTop: "-7%" }} onClick={() => FULLWINDOWPOPUP(value.id)}>View Comments</button><button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "5%", marginTop: "-7%" }} onClick={() => FULLWINDOWPOPUP(value.id)}>Delete Video</button></td>
                                            <td>{val.USERCOUNT}</td>
                                            <td>{VALUE.USERCOUNT}</td>
                                        </tr>
                                    </tbody>
                                </>
                            }
                        })
                    })
                })
            }
        </table>
    </>
}

export default VIDEOUPLOAD;