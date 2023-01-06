import React from 'react';
import "./FLE.css";
import { useState } from 'react';
import axios from "axios";

const FILE = () => {

    const [VIDEONAME,setVIDEONAME]=useState("");
    const [VIDEO,setVIDEO]=useState("");

    const METHOD=()=>{
        axios.post("http://localhost:5000/UPLOAD",{
            VIDEONAME:VIDEONAME,
            VIDEO:VIDEO
        })
    }

    return <>
        <form>
            <section className="vh-200 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Upload</h2>
                                        <p className="text-white-50 mb-5">Please Uplaod Your Video!</p>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Video Name</label>
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Video Name" onChange={(e)=>setVIDEONAME(e.target.value)} />
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <label for="formFileMultiple" class="form-label"></label>
                                            <input className="form-control" type="file" id="formFileMultiple" onChange={(e)=>setVIDEO(e.target.value)} multiple />
                                        </div><br /><br /><br />
                                        <div className="form-outline form-white mb-4">
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={METHOD}>Upload</button>
                                        </div>
                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!"></a></p>

                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">

                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </>
}
export default FILE;