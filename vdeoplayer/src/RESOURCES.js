import { React } from "react";
import "./RES.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const RESOURCES = () => {
    const [RESOURCE, setRESOURCE] = useState("");
    const [RESOURCELINK, setRESOURCELINK] = useState("");
    const [RES, setRES] = useState([]);
    const [SEARCH, setSEARCH] = useState("");

    const METHOD = (RESOURCE, RESOURCELINK) => {
        if (RESOURCE == "" && RESOURCELINK == "") {
            alert("Provide Resource Name And Resource Link");
        }
        if (RESOURCE !== "" && RESOURCELINK !== "") {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/USERRESOURCE`, {
                RESOURCE: RESOURCE,
                RESOURCELINK: RESOURCELINK
            })
        }
    }

    const FUNCTION = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERRESOURCE`)
            .then((RES) => {
                console.log(RES);
                setRES(RES.data);
            })
    }


    useEffect(() => {
        FUNCTION();
    }, [])


    return <>
    <body className="mac">
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
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/FILE">Chat</Link>
                        </li>
                    </ul>
                </div>
                <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Search Resource" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
                </div>
            </div>
        </nav><br />
        <p><h5>Developer can provide resources</h5></p>
        <div className="container bg-white" style={{ marginTop: "3%" }}>
            <div className="col-md-15">
                <form className="form-inline">
                    <label htmlFor="RESOURCE">Enter Resource Name:</label>
                    <input type="text" onChange={(e) => setRESOURCE(e.target.value)} required />
                    <label htmlFor="RESOURCELINK">Resource Link:</label>
                    <input type="text" onChange={(e) => setRESOURCELINK(e.target.value)} required />
                    <button type="submit" className="btn-lg btn-primary" onClick={() => METHOD(RESOURCE, RESOURCELINK)}>Post</button>
                </form>
            </div>
        </div>
        {
            RES.filter((value) => {
                if (SEARCH == "") {
                    return value;
                }
                else if (value.RESOURCE.toLowerCase().includes(SEARCH.toLowerCase()) || value.LINK.toLowerCase().includes(SEARCH.toLowerCase())) {
                    return value;
                }
            }).map((value, i) => {
                return <><br />
                    {/* <div className="card bg-dark text-white" >
                        <h3><div className="card-body">{value.RESOURCE}</div></h3>
                        <h3 key={i}> <a href={value.LINK}>{value.LINK}</a></h3>
                    </div> */}

                    <div class="row">
                        <div class="column">
                            <div className="user-cards-container">
                                <div className="user-card"><br />
                                    <div className="user-info">
                                        <h5 key={i}>{value.RESOURCE}</h5><br />
                                        <h5 key={i}> <a href={value.LINK}>{value.LINK}</a></h5>
                                        {/* <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked" />
                                        <span className="fa fa-star checked"/> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            })
        }
        </body>
    </>
}
export default RESOURCES;