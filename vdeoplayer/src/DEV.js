import { React, useEffect } from "react";
import "./DEVELOPER.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";




const DEV = () => {
  const [USER, setUSER] = useState([]);
  const [SEARCH, setSEARCH] = useState("");

  const METHOD = async() => {
   await axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERDATA`)
      .then((RES) => {
        console.log(RES);
        setUSER(RES.data);
      })
  }
  useEffect(() => {
    METHOD();
  }, [])
  return <>
   <body className="pc">
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
          <input type="search" id="form1" className="form-control" placeholder="Search Users Name" aria-label="Search" onChange={(e) => setSEARCH(e.target.value)} />
        </div>
      </div>
    </nav>
    {
      USER.filter((value) => {
        if (SEARCH == "") {
          return value;
        }
        else if (value.FIRSTNAME.toLowerCase().includes(SEARCH.toLowerCase()) || value.LASTNAME.toLowerCase().includes(SEARCH.toLowerCase())) {
          return value;
        }
      }).map((value, i) => {
        return <>
          <div class="row">
            <div class="column">
              <div className="user-cards-container">
                <div className="user-card" style={{height:"0%"}}>
                  <div className="user-info">
                    <h3 key={i} style={{marginLeft:"33%"}}>{value.FIRSTNAME} {value.LASTNAME}</h3>
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
export default DEV;