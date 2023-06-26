import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const VIDEOUPLOAD = () => {
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [USERLOGINDATA, setUSERLOGINDATA] = useState([]);
    const [USERFOLLOWSTATUS, setUSERFOLLOWSTATUS] = useState([]);
    const [USERCOMMENTSTATUS, setUSERCOMMENTSTATUS] = useState([]);
    const [USERVIEWVIEW, setUSERVIEWVIEW] = useState([]);
    const [USERID, setUSERID] = useState([]);

    function FULLWINDOWPOPUP(ID) {
        window.open(`${process.env.REACT_APP_FRONTEND_URL}/USERCOMMENT/${ID}`, "bfs", "fullscreen,scrollbars");
    }

    function DELETEFUNCTION(ID) {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/USERVIDEODELETE/${ID}`);
        alert("Your Video Deleted");
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERVIDEOVIDEO`).then((RES) => {
            console.log("USERVIDEOVIDEO", RES.data);
            setUSERVIDEOLIST(RES.data);
        });
        setUSERLOGINDATA(localStorage.getItem("USERGENERATEDID"));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERFOLLOWSTATUS`).then((RES) => {
            console.log("USERFOLLOWSTATUS", RES.data);
            setUSERFOLLOWSTATUS(RES.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERCOMMENTBELLSTATUS`).then((RES) => {
            console.log("USERCOMMENTBELLSTATUS", RES.data);
            setUSERCOMMENTSTATUS(RES.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERVIEWDATA`).then((RES) => {
            console.log("USERVIEWDATA", RES.data);
            setUSERVIEWVIEW(RES.data);
        });
        setUSERID(localStorage.getItem("USERGENERATEDID"));
    }, []);

    return (
        <>
            <table className="table" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th scope="col">Videos</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Views</th>
                    </tr>
                </thead>
                {USERVIDEOLIST.map((value, index) => {
                    let likeCount = 0;
                    let commentCount = 0;
                    let viewCount = 0;

                    // Calculate the total likes count
                    USERFOLLOWSTATUS.forEach((val, index) => {
                        if (value.USERID === USERLOGINDATA && val.USERGENERATEID === USERLOGINDATA && value.VIDEOFIVE === val.USERVIDEO) {
                            likeCount += val.USERCOUNT;
                        }
                    });

                    // Calculate the total comments count
                    USERCOMMENTSTATUS.forEach((VALUE, index) => {
                        if (value.VIDEOFIVE === `VIDEO/${VALUE.USERCOMMENTVIDEO}` && value.USERID === USERLOGINDATA) {
                            commentCount += VALUE.USERCOUNT;
                        } else if (value.VIDEOFIVE === `VIDEONOISEREDUCE/${VALUE.USERCOMMENTVIDEO}` && VALUE.USERGENERATEDID !== USERLOGINDATA) {
                            commentCount += VALUE.USERCOUNT;
                        }
                    });

                    // Calculate the total views count
                    USERVIEWVIEW.forEach((DATA, index) => {
                        if (value.VIDEOFIVE === `VIDEO/${DATA.USERVIDEO}` && DATA.USERUNIQUEID === USERLOGINDATA) {
                            viewCount += DATA.USERCOUNT;
                        } else if (value.VIDEOFIVE === `VIDEONOISEREDUCE/${DATA.USERVIDEO}` && DATA.USERUNIQUEID !== USERLOGINDATA) {
                            viewCount += DATA.USERCOUNT;
                        }
                    });

                    // Check if any of the counts are non-zero
                    if (likeCount !== 0 || commentCount !== 0 || viewCount !== 0) {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <video src={`${process.env.REACT_APP_BACKEND_URL}/${value.VIDEOFIVE}`} type="video/mp4" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}></video>
                                        <div className="md-form mb-3 pink-textarea active-pink-textarea">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-primary rounded-pill mr-2"
                                                    style={{
                                                        minWidth: "150px",
                                                        padding: "10px 20px",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                    onClick={() => FULLWINDOWPOPUP(value.id)}
                                                >
                                                    View Comments
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary rounded-pill"
                                                    style={{
                                                        minWidth: "150px",
                                                        padding: "10px 20px",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                    onClick={() => DELETEFUNCTION(value.id)}
                                                >
                                                    Delete Video
                                                </button>
                                            </div>
                                        </div>

                                        {/* <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                            <button type="button" className="btn btn-primary rounded-pill" style={{ marginRight: "10px", borderRadius: '0' }} onClick={() => FULLWINDOWPOPUP(value.id)}>View Comments</button>
                                            <button type="button" className="btn btn-primary rounded-pill" style={{ borderRadius: '0' }} onClick={() => DELETEFUNCTION(value.id)}>Delete Video</button>
                                        </div> */}
                                    </td>
                                    <td>{likeCount}</td>
                                    <td>{commentCount}</td>
                                    <td>{viewCount}</td>
                                </tr>
                            </tbody>
                        );
                    }

                    return null; // Return null for rows with zero counts
                })}
            </table>
        </>
    );
}

export default VIDEOUPLOAD;




{/*VIDOE AND LIKE*/ }
{/* {
                USERVIDEOLIST.map((value, index) => {
                    return USERFOLLOWSTATUS.map((val, index) => {
                        if (value.USERID === USERLOGINDATA && val.USERGENERATEID === USERLOGINDATA && value.VIDEOFIVE == val.USERVIDEO) {
                            return <>
                                <tbody>
                                    <tr>
                                        <td> <video src={`http://localhost:3001/${value.VIDEOFIVE}`} type="video/mp4" style={{ width: "25%", marginLeft: "-0%" }}></video> <button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "5%", marginTop: "-7%" }} onClick={() => FULLWINDOWPOPUP(value.id)}>View Comments</button><button type="button" class="btn btn-primary rounded-pill" style={{ marginLeft: "5%", marginTop: "-7%" }} onClick={() => DELETEFUNCTION(value.id)}>Delete Video</button></td>
                                        <td>{val.USERCOUNT}</td>
                                    </tr>
                                </tbody>
                            </>
                        }
                    })
                })
            } */}

{/* COMMENT */ }
{/* {
                USERVIDEOLIST.map((value, index) => {
                    return USERCOMMENTSTATUS.map((VALUE, index) => {
                        if (value.VIDEOFIVE == `VIDEO/${VALUE.USERCOMMENTVIDEO}` && value.USERID === USERLOGINDATA) {
                            return <>
                                <tbody>
                                    <tr>
                                        <td>{VALUE.USERCOUNT}</td>
                                    </tr>
                                </tbody>
                            </>

                        }
                        else if (value.VIDEOFIVE == `VIDEONOISEREDUCE/${VALUE.USERCOMMENTVIDEO}` && VALUE.USERGENERATEDID !== USERLOGINDATA) {
                            return <>
                                <tbody>
                                    <tr>
                                        <td>{VALUE.USERCOUNT}</td>
                                    </tr>
                                </tbody>
                            </>
                        }
                    })
                })
            } */}

{/* VIEW */ }
{/* {
                USERVIDEOLIST.map((value, index) => {
                    return USERVIEWVIEW.map((DATA, index) => {
                        if (value.VIDEOFIVE == `VIDEO/${DATA.USERVIDEO}` && DATA.USERUNIQUEID === USERLOGINDATA) {
                            return <>
                                <tbody>
                                    <tr>
                                        <td>{DATA.USERCOUNT}</td>
                                    </tr>
                                </tbody>
                            </>

                        }
                        else if (value.VIDEOFIVE == `VIDEONOISEREDUCE/${DATA.USERVIDEO}` && DATA.USERUNIQUEID !== USERLOGINDATA) {
                            return <>
                                <tbody>
                                    <tr>
                                        <td>{DATA.USERCOUNT}</td>
                                    </tr>
                                </tbody>
                            </>
                        }
                    })
                })
            } */}