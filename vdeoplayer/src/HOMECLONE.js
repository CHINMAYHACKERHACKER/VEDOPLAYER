import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';
import "./CLONE.css";
import { Link } from "react-router-dom";

const HOMECLONE = () => {
    const [VIDEO, setVIDEO] = useState([]);

    useEffect(() => {
        METHOD();
    }, [])
    const METHOD = () => {
        axios.get("http://localhost:5000/UPLOAD")
            .then((RES) => {
                setVIDEO(RES.data);
            })
    }

    return <>
        <div>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 col-12 col-sm-11">
                        <div className="row my-1 py-1">
                        </div>
                        <div className="row my-3">
                            {VIDEO.map((value, i) => {
                                return <>
                                    <div className="col-lg-3 col-md-4 col-sm-6 pb-5">
                                        {/* <div className="row px-2"> */}
                                        <div className="col ratio ratio-16x9">
                                            <video width={350} controls>
                                                <source src={value.vide} />
                                            </video>
                                            {/* </div> */}
                                        </div>
                                        <div className="row px-2">
                                            <div className="col-2">
                                                <img className="rounded-circle" width="100%" src="https://yt3.ggpht.com/ytc/AKedOLRxGhI6cD9_rbmxl6w1hcxjqYB6D1IjDItj3sNWsA=s176-c-k-c0x00ffffff-no-rj" alt="" />
                                            </div>
                                            <div className="col-10">
                                                <h4 className="p-0 m-0">Swim with less effort</h4>
                                            </div>
                                        </div>
                                        <div className="row px-2">
                                            <div className="col-2">
                                            </div>
                                            {/* <div className="col-10">
                                                <p className="p-0 m-0">Skill N's Talent</p>
                                                <p className="p-0 m-0">5.9M View . 9 months ago</p>
                                            </div> */}
                                        </div>
                                    </div>
                                </>
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className="row bg-white position-fixed bottom-0 d-sm-none d-flex">
                    <div className="col"><img className="w-75" src="homeIcon.png" alt="" /></div>
                    <div className="col"><img className="w-75" src="shortsIcon.png" alt="" /></div>
                    <div className="col"><img className="w-75" src="plusIcon.png" alt="" /></div>
                    <div className="col"><img className="w-75" src="subscriptionsIcon.png" alt="" /></div>
                    <div className="col"><img className="w-75" src="libraryIcon.png" alt="" /></div>
                </div>
            </div>
        </div>
        {/* {
            VIDEO.map((value, i) => {
                return <>
                    <div className="container" style={{ float: "left", width: "33%", height: "230px" }}>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="embed-responsive embed-responsive-16by9">
                                    <video width={350} controls>
                                        <source src="MANZOORE NAZAR- Sourav Joshi Vlogs, Priya Dhapa - Saaj Bhatt, Srishti Bhandari - Amjad Nadeem Aamir.mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            })
        } */}
    </>
}


export default HOMECLONE;