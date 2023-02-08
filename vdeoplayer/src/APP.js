import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HOME from "./HOME.js";
import LOGIN from "./LOGIN.js";
import FILE from "./FILE.js";
import DEV from "./DEV.js";
import CONTACT from "./CONTACT.js";
import ABOUT from "./ABOUT.js";
import RESOURCES from "./RESOURCES.js";
import UPLOAD from "./UPLOAD.js";
import VIDEO from "./VIDEO.js";


const APP = () => {
  return  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<HOME/>}/>
    <Route path="/FILE" element={<FILE/>}/>
    <Route path="/LOGIN" element={<LOGIN/>}/>
    <Route path="/DEV" element={<DEV/>}/>
    <Route path="/CONTACT" element={<CONTACT/>}/>
    <Route path="/ABOUT" element={<ABOUT/>}/>
    <Route path="/RES" element={<RESOURCES/>}/>
    <Route path="/UPLOAD" element={<UPLOAD/>}/>
    <Route path="/VIDEO" element={<VIDEO/>}/>
  </Routes>
  </BrowserRouter>
  </>
}
export default APP;