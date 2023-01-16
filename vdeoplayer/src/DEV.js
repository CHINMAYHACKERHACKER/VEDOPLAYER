import { React, useEffect } from "react";
import "./DEVELOPER.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";




const DEV = () => {
  const [USER, setUSER] = useState([]);
  const [SEARCH, setSEARCH] = useState("");

  const METHOD = () => {
    axios.get("http://localhost:3001/USERDATA")
      .then((RES) => {
        console.log(RES.data);
        setUSER(RES.data);
      })
  }
  useEffect(() => {
    METHOD();
  }, [])
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary gradient-custom">
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
          <input type="search" id="form1" className="form-control" placeholder="Search Dev Name  Frameworks  programming languages" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
        </div>
      </div>
    </nav>
    {
      USER.filter((value) => {
        if (SEARCH == "") {
          return value;
        }
        else if (value.FIRSTNAME.toLowerCase().includes(SEARCH.toLowerCase()) || value.LASTNAME.toLowerCase().includes(SEARCH.toLowerCase()) || value.LANGUAGE.toLowerCase().includes(SEARCH.toLowerCase())) {
          return value;
        }
      }).map((value, i) => {
        return <>
          <div class="row">
            <div class="column">
              <div className="user-cards-container">
                <div className="user-card">
                  <img className="user-img" src={`http://localhost:3001/${value.IMAGE}`} alt="User" />
                  <div className="user-info">
                    <h3 key={i}>{value.FIRSTNAME} {value.LASTNAME}</h3>
                    <p className="user-title">{value.PROFESSION}</p>
                    <p className="user-title">{value.LANGUAGE}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      })
    }
  </>
}
export default DEV;