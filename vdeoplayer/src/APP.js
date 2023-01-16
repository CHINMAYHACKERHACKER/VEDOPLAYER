import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HOME from "./HOME.js";
import LOGIN from "./LOGIN.js";
import FILE from "./FILE.js";
import DEV from "./DEV.js";



const APP = () => {
  return  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<HOME/>}/>
    <Route path="/FILE" element={<FILE/>}/>
    <Route path="/LOGIN" element={<LOGIN/>}/>
    <Route path="/DEV" element={<DEV/>}/>
  </Routes>
  </BrowserRouter>
  </>
}
export default APP;