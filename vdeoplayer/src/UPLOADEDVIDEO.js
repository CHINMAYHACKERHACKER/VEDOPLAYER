import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const UPLOADEDVIDEO = () => {
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [USERLOGINDATA, setUSERLOGINDATA] = useState([]);


    function DELETEFUNCTION(ID) {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/USERVIDEODELETE/${ID}`)
        alert("Your Video Deleted");
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERVIDEOVIDEO`)
            .then((RES) => {
                console.log("USERVIDEOVIDEO", RES.data);
                setUSERVIDEOLIST(RES.data);
            })
        setUSERLOGINDATA(localStorage.getItem("USERGENERATEDID"));
    }, [])

    return <>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Videos</th>
                </tr>
            </thead>
            {
                USERVIDEOLIST.map((value, index) => {
                    if (value.USERID === USERLOGINDATA) {
                        return <>
                            <tbody>
                                <tr>
                                    <td> <video src={`${process.env.REACT_APP_BACKEND_URL}/${value.VIDEOFIVE}`} type="video/mp4" style={{ width: "25%", marginLeft: "-0%" }}></video> <button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "5%", marginTop: "-7%" }} onClick={() => DELETEFUNCTION(value.id)}>Delete Video</button></td>
                                </tr>
                            </tbody>
                        </>
                    }
                })
            }
        </table>
    </>
}
export default UPLOADEDVIDEO;