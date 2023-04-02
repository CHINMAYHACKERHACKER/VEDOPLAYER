import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HOME from "./HOME.js";
import LOGIN from "./LOGIN.js";
import FILE from "./FILE.js";
import DEV from "./DEV.js";
import CONTACT from "./CONTACT.js";
import ABOUT from "./ABOUT.js";
import RESOURCES from "./RESOURCES.js";
import UPLOAD from "./UPLOAD.js";
import VIDEO from "./VIDEO.js";
import COMMENT from "./COMMENT.js";
import USERCOMMENT from "./USERCOMMENT.js";
import USERHOMELOGIN from "./USERHOMELOGIN.js";



const APP = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<USERHOMELOGIN/>} />
        <Route path="/HOME" element={<HOME />}/>
        <Route path="/FILE" element={<FILE />} />
        <Route path="/LOGIN" element={<LOGIN />} />
        <Route path="/DEV" element={<DEV />} />
        <Route path="/CONTACT" element={<CONTACT />} />
        <Route path="/ABOUT" element={<ABOUT />} />
        <Route path="/RES" element={<RESOURCES />} />
        <Route path="/UPLOAD" element={<UPLOAD />} />
        <Route path="/VIDEO" element={<VIDEO />} />
        <Route path="/COMMENT/VIDEO/:VIDEOONE/VIDEO/:VIDEOTWO/VIDEO/:VIDEOTHREE/VIDEO/:VIDEOFIVE/:ID" element={<COMMENT />}/>
        <Route path="/USERCOMMENT/:ID" element={<USERCOMMENT />} />
      </Routes>
    </BrowserRouter>
  </>
}
export default APP;