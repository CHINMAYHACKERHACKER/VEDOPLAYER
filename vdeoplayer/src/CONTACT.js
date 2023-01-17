import React from 'react';
import "./CONTACT.css";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const CONTACT = () => {

    const NAVIGATE = useNavigate();

    const [MESSAGE, setMESSAGE] = useState("");

    const METHOD = () => {
        axios.post("http://localhost:3001/contact", {
            MESSAGE: MESSAGE
        })
            .then(() => {
                NAVIGATE("/");
            })
    }
    return <>
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <div className="container">
                <h1>Contact Us</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea  type="text" id="form3Example4" className="form-control" placeholder="Write Your Message With Your Email Address" onChange={(e)=>setMESSAGE(e.target.value)} style={{width:"1000ppx",height:"300px"}} required/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={METHOD}>Submit</button>
                </form>
            </div>
        </div>
    </>
}
export default CONTACT;