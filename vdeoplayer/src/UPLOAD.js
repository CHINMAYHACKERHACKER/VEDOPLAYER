import { React } from "react";
import "../src/VIDEO.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UPLOADIMAGE.css";

const UPLOAD = () => {
    const [TITLE, setTITLE] = useState("");
    // const [DESCRIPTION, setDESCRIPTION] = useState("");
    const [VIDEO, setVIDEO] = useState("");
    const [USERUNIQUEID, setUSERUNIQUEID] = useState("");
    console.log(VIDEO);

    const METHOD = (e) => {
        e.preventDefault();
        const FORMDATA = new FormData();
        FORMDATA.append("TITLE", TITLE);
        // FORMDATA.append("DESCRIPTION", DESCRIPTION);
        FORMDATA.append("VIDEO", VIDEO);
        FORMDATA.append("USERUNIQUEID", USERUNIQUEID);

        axios
            .post("http://localhost:3001/VIDEO", FORMDATA);
        alert("Video Uploaded Sucessfully");
    }

    return <>
     <body className="UPLOAD">
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
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
                            <Link className="nav-link text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/FILE">Chat</Link>
                        </li>
                        {/* <li className="nav-item">
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li> */}
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/DEV">Developers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/RES">Resources</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/VIDEO">Videos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/ABOUT">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/CONTACT">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        <div className="container"><br /><br /><br />
            <h2 >Upload Video</h2>
            <form>
                <div className="form-group">
                    <label for="video" >Select Video:</label>
                    <input type="file" className="form-control-file"  onChange={(e) => setVIDEO(e.target.files[0])} />
                </div>
                <div className="form-group">
                    <label for="title" >Title:</label>
                    <input type="text" className="form-control"  onChange={(e) => setTITLE(e.target.value)} />
                </div>
                <div className="form-group">
                    <label for="title" >Enter Saved Unique Id:</label>
                    <input type="text" className="form-control"  onChange={(e) => setUSERUNIQUEID(e.target.value)} />
                </div>
                {/* <div className="form-group">
                    <label for="description" >Description:</label>
                    <textarea className="form-control" id="description" name="description" onChange={(e) => setDESCRIPTION(e.target.value)}></textarea>
                </div> */}
                <button type="submit" className="btn btn-primary" style={{marginLeft:"1%"}} onClick={METHOD}>Upload</button>
            </form>
        </div>
        </body>
    </>
}
export default UPLOAD;