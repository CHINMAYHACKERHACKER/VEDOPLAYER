import { React } from "react";
import "../src/VIDEO.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UPLOADIMAGE.css";
import { useEffect } from "react";

const UPLOAD = () => {
    const [TITLE, setTITLE] = useState("");
    // const [DESCRIPTION, setDESCRIPTION] = useState("");
    const [VIDEO, setVIDEO] = useState("");
    const [USERUNIQUEID, setUSERUNIQUEID] = useState("");
    const [NOISEREDUCE, setNOISEREDUCE] = useState("");
    const [AUDIO, setAUDIO] = useState("");
    const [USERAUDIO, setUSERAUDIO] = useState("");
    const [USERSTATUSDATA, setUSERSTATUSDATA] = useState([]);
    const [USERLOGINDATA, setUSERLOGINDATA] = useState([]);
    const [USERID, setUSERID] = useState([]);



    console.log(NOISEREDUCE);


    console.log(VIDEO);

    const METHOD = (e) => {
        e.preventDefault();
        if (TITLE == "" || VIDEO == "" || USERUNIQUEID == "") {
            alert("Pls fill all field");
        }
        else {
            const FORMDATA = new FormData();
            FORMDATA.append("TITLE", TITLE);
            // FORMDATA.append("DESCRIPTION", DESCRIPTION);
            // FORMDATA.append("VIDEO", VIDEO);
            FORMDATA.append("USERUNIQUEID", USERUNIQUEID);
            FORMDATA.append("NOISEREDUCE", NOISEREDUCE);
            FORMDATA.append("AUDIO", AUDIO);
            FORMDATA.append("USERAUDIO", USERAUDIO);
            for (let i = 0; i < VIDEO.length; i++) {
                FORMDATA.append('VIDEO', VIDEO[i]);
            }

            axios
                .post("http://localhost:3001/VIDEO", FORMDATA);
            alert("Video Uploaded Pls Wait Until Its Complete Its Process");
        }
        // METHODSTATUS(TITLE);
    }

    // const METHODSTATUS=(TITLE)=>{
    //     USERSTATUSDATA.map((value)=>{
    //         USERLOGINDATA.map((val)=>{
    //                 if(value.USERGENERATEDID==val.USERGENERATEDID ){
    //                     return alert(TITLE+"Uploaded");
    //             }
    //         })
    //     })
    // }

    useEffect(() => {
        axios.get("http://localhost:3001/USERFOLLOWUSERDATA")
            .then((RES) => {
                console.log("USERFOLLOWUSERDATA", RES.data);
                setUSERSTATUSDATA(RES.data)
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3001/USERLOGIN")
            .then((RES) => {
                console.log("USERLOGIN", RES.data);
                setUSERLOGINDATA(RES.data)
            })
        setUSERID(localStorage.getItem("USERGENERATEDID"));
    }, [])

    return <>
        <body className="UPLOAD">
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white">
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
                                {/* <Link className="nav-link text-white" to="/HOME">Home</Link> */}
                            </li>
                            <li className="nav-item">
                                {/* <Link className="nav-link " to="/FILE">Chat</Link> */}
                            </li>
                            {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
                            {/* <li className="nav-item">
                                <Link className="nav-link text-white" to="/DEV">Users</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/VIDEO">Videos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ABOUT">Guidelines</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/USERUNIQUEID">Unique Id</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/CONTACT">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <div className="container"><br />
                <h2 >Upload Video</h2>
                <form>
                    <div className="form-group">
                        <label for="video" >Select Video:(Select Only Video or Select Both Video And Audio)</label>
                        <input type="file" className="form-control-file" multiple onChange={(e) => setVIDEO(e.target.files)} required />
                    </div>
                    {/* <div className="form-group">
                        <label for="title" >Noise Reduction:</label>
                        <input type="text" className="form-control" placeholder="Type Yes If Your Video Contains Background Noise" onChange={(e) => setNOISEREDUCE(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="title" >Background Music:</label>
                        <input type="text" className="form-control" placeholder="Type Yes If Your Video Contains Background Noise" onChange={(e) => setAUDIO(e.target.value)} />
                    </div> */}
                    <div className="form-group">
                        <label for="title" >Video Title:</label>
                        <input type="text" className="form-control" maxLength={67} placeholder="Enter Fourty Five Char" onChange={(e) => setTITLE(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="title" >Enter Unique Id:</label>
                        <input type="text" className="form-control" placeholder="Enter Saved Unique Id" onChange={(e) => setUSERUNIQUEID(e.target.value)} required />
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "10px" }}>
                            <label for="title" style={{ color: "black" }} ><h6>Only Noise Reduction:</h6></label>
                            <select onChange={(e) => setNOISEREDUCE(e.target.value)}>
                                <option>Select Option</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div style={{ marginRight: "10px" }}>
                            <label for="title" style={{ color: "black" }}><h6>Noise Reduction+Background Music:</h6></label>
                            <select onChange={(e) => setAUDIO(e.target.value)} >
                                <option>Select Option</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div style={{ marginRight: "10px" }}>
                            <label for="title" style={{ color: "black" }}><h6>Only Background Music:</h6></label>
                            <select onChange={(e) => setUSERAUDIO(e.target.value)}>
                                <option>Select Option</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                    </div>
                    {/* <div className="form-group">
                    <label for="description" >Description:</label>
                    <textarea className="form-control" id="description" name="description" onChange={(e) => setDESCRIPTION(e.target.value)}></textarea>
                </div> */}
                    <button type="submit" className="btn btn-primary" style={{ marginLeft: "1%" }} onClick={METHOD}>Upload</button>
                </form>
            </div>
        </body>
    </>
}
export default UPLOAD;