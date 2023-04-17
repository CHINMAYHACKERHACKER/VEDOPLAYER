import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MAINHOMEPAGE = () => {
    const [USERLOGIN, setUSERLOGIN] = useState([]);
    const [USERID, setUSERID] = useState([]);
    const HISTORY = useNavigate();


    const SIGN = () => {
        HISTORY("/USERHOMELOGIN");
    }


    const METHOD = () => {
        HISTORY("/HOMEVIDEO");
    }

    useEffect(() => {
        axios.get('http://localhost:3001/USERLOGIN')
            .then((res) => {
                console.log(res.data);
                setUSERLOGIN(res.data);
            });
    }, []);

    useEffect(() => {
        setUSERID(localStorage.getItem('USERGENERATEDID'));
    }, []);

    useEffect(() => {
        USERLOGIN.map((value) => {
            if (value.USERGENERATEDID == USERID) {
                return HISTORY("/VIDEO");
            }
        });
    }, [USERLOGIN, USERID, HISTORY]);
    return <> 
    <button type="button" class="btn btn-primary" style={{ marginLeft: "40%",  marginTop: "20%" }} onClick={SIGN}>Sign Up</button>
    <button type="button" class="btn btn-primary" style={{ marginLeft: "1%",  marginTop: "20%" }} onClick={METHOD}>Watch Videos</button>
    </>;
}
export default MAINHOMEPAGE;