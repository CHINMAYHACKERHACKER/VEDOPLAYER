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
    const [USERUNIQUEID, setUSERUNIQUEID] = useState([]);
    const [USERREPLYDATA, setUSERREPLYDATA] = useState([]);



    const METHOD = (USERGENERATEDID, USERUNIQUEID, ID) => {
        var inputField = document.createElement("input");
        inputField.style.height = "0%"; // add margin-left style
        document.body.appendChild(inputField);

        var submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        submitButton.classList.add("btn", "btn-primary"); // add Bootstrap classes
        submitButton.style.marginLeft = "1%"; // add margin-left style
        document.body.appendChild(submitButton);

        submitButton.addEventListener("click", function () {
            var inputValue = inputField.value;
            USERREPLYFUNCTION(USERGENERATEDID, inputValue, USERUNIQUEID, ID);
            console.log(inputValue);
            alert("Submitted Successfully");
        })
    }

    const USERREPLYFUNCTION = (USERGENERATEDID, Value, USERUNIQUEID, ID) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/REPLY`, {
            ID: ID,
            INPUTVALUE: Value,
            USERGENERATEDID: USERGENERATEDID,
            USERUNIQUEID: USERUNIQUEID
        })
    };


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
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERCOMMENT`)
            .then((RES) => {
                console.log('USERCOMMENT', RES.data);
                setUSERCOMET(RES.data);
            })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERLOGIN`)
            .then((RES) => {
                console.log('USERLOGIN', RES.data);
                setUSERLOGINDATA(RES.data);
            })
        setUSERUNIQUEID(localStorage.getItem("USERGENERATEDID"));
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/REPLY`)
            .then((RES) => {
                console.log('USERLOGIN', RES.data);
                setUSERREPLYDATA(RES.data);
            })
        setUSERUNIQUEID(localStorage.getItem("USERGENERATEDID"));
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
                            <img className="user-img" src={`${process.env.REACT_APP_BACKEND_URL}/${VALUE.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", width: "30px", height: "30px", marginLeft: "3%" }} />
                            <h5 key={i} style={{ margin: "0%", display: "inline", color: "grey" }}><i style={{ color: "black" }}>{VALUE.USERNAME}:{value.USERCOMMENT}</i></h5><br />
                            <i class="fa-solid fa-reply" style={{ fontSize: "15px" }} onClick={() => METHOD(value.USERGENERATEDID, USERUNIQUEID, PARAM.ID)}></i>
                            <br />
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

        <p>
            <a class="" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style={{ marginLeft: "-79%" }}>Replied Comments</a>
        </p>
        <div className="collapse" id="collapseExample">
            <div className="card card-bod">
                {USERREPLYDATA.map((value, i) => {
                    return USERLOGINDATA.map((VALUE, j) => {
                        if (value.USERID == USERUNIQUEID && VALUE.USERGENERATEDID !== USERUNIQUEID && value.USERREPLYEDID !== USERUNIQUEID && value.USERVIDEOID == PARAM.ID) {
                            return (
                                <div key={j}>
                                    <img className="user-img" src={`${process.env.REACT_APP_BACKEND_URL}/${VALUE.IMAGE}`} alt="User" style={{ marginTop: "0%", borderRadius: "50%", width: "30px", height: "30px", marginLeft: "3%" }} />
                                    <h5 key={i} style={{ margin: "0%", display: "inline", color: "grey" }}><i style={{ color: "black" }}>{value.REPLY}</i></h5><br/><br/>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })
                })}
            </div>
        </div>
    </>
}
export default USERCOMMENT;