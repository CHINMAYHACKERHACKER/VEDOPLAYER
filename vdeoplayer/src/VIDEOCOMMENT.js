import React, { useEffect, useState } from "react";
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
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERVIDEOVIDEO`).then((RES) => {
            console.log(RES);
            setUSERVIDEOLIST(RES.data);
        });
    };

    const USERIMAGEDATA = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERIMAGEDATA`).then((RES) => {
            console.log(RES);
            setUSERIMAGE(RES.data);
        });
    };

    const VIDEOFUNCTION = (
        ID,
        USERID,
        VIDEOONE,
        VIDEOTWO,
        VIDEOTHREE,
        VIDEOFIVE,
        VIDEONOISEREDUCE,
        VIDEOMUSIC,
        USERAUDIO
    ) => {
        if (VIDEOMUSIC === "yes") {
            NAVIGATE(
                `/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${VIDEOMUSIC}/${USERID}/${ID}`
            );
        } else if (VIDEONOISEREDUCE === "yes") {
            NAVIGATE(
                `/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${VIDEONOISEREDUCE}/${USERID}/${ID}`
            );
        } else if (USERAUDIO === "yes") {
            NAVIGATE(
                `/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${USERAUDIO}/${USERID}/${ID}`
            );
        } else {
            NAVIGATE(
                `/COMMENT/${VIDEOONE}/${VIDEOTWO}/${VIDEOTHREE}/${VIDEOFIVE}/${null}/${USERID}/${ID}`
            );
        }
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        METHOD();
        USERIMAGEDATA();
    }, []);

    return (
        <>
            <div
                className="container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    maxWidth: "100%",
                    overflowX: "scroll",
                    padding: "10px",
                    marginLeft: "-100px", // Add spacing on the right
                }}
            >
                {USERVIDEOLIST.filter((value) => {
                    if (props.value === "") {
                        return value;
                    } else if (
                        value.TITLE.toLowerCase().includes(props.value.toLowerCase())
                    ) {
                        return value;
                    }
                }).map((value, index) => (
                    <div
                        key={index}
                        style={{
                            width: "50%",
                            maxWidth: "300px",
                            marginBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                position: "relative",
                                paddingBottom: "56.25%",
                                height: "0",
                                overflow: "hidden",
                            }}
                        >
                            <video
                                src={`${process.env.REACT_APP_BACKEND_URL}/${value.VIDEOFIVE}`}
                                type="video/mp4"
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    border: "5px solid white",
                                    objectFit: "cover",
                                    left: "0",
                                    top: "0",
                                }}
                                onClick={() =>
                                    VIDEOFUNCTION(
                                        value.id,
                                        value.USERID,
                                        value.VIDEOONE,
                                        value.VIDEOTWO,
                                        value.VIDEOTHREE,
                                        value.VIDEOFIVE,
                                        value.VIDEONOISEREDUCE,
                                        value.VIDEOMUSIC,
                                        value.USERAUDIO
                                    )
                                }
                            ></video>
                        </div>
                        {USERIMAGE.map((val, i) => {
                            if (val.USERGENERATEDID === value.USERID) {
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            margin: "10px",
                                        }}
                                    >
                                        <img
                                            className="user-img"
                                            src={`${process.env.REACT_APP_BACKEND_URL}/${val.IMAGE}`}
                                            alt="User"
                                            style={{
                                                borderRadius: "50%",
                                                width: "25px",
                                                height: "25px",
                                                marginRight: "10px",
                                            }}
                                        />
                                        <h5>{val.USERNAME}</h5>
                                    </div>
                                );
                            }
                        })}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <h6 style={{ textAlign: "center" }}>{value.TITLE.substring(0, 40)}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default VIDEOCOMMENT;
