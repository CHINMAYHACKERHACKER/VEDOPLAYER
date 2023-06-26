import React from "react";
import { useState } from "react";
import { useEffect } from "react";


const USERUNIQUEID = () => {
    const [USERGENERATEDID, setUSERGENERATEDID] = useState("");

    useEffect(() => {
        setUSERGENERATEDID(localStorage.getItem("USERGENERATEDID"));
    }, [])
    return <>
    </>
}
export default USERUNIQUEID;