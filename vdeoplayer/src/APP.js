import React from 'react';
import { lazy,Suspense } from 'react';
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
import HOMEVIDEO from "./HOMEVIDEO.js";
import HOMEVIDEOVIDEO from "./HOMEVIDEOVIDEO.js";
import VIDEOUPLOAD from "./VIDEOUPLOAD.js";
import MAINHOMEPAGE from "./MAINHOMEPAGE.js";
import USERUNIQUEID from "./USERUNIQUEID.js";
const UPLOADEDVIDEO=lazy(()=>import("./UPLOADEDVIDEO.js"))

const APP = () => {
  return <>
    <BrowserRouter>
    <Suspense fallback={<div>Please wait loading</div>}>
      <Routes>
      <Route path="/" element={<MAINHOMEPAGE/>} />
        <Route path="/HOMEVIDEO" element={<HOMEVIDEO />} />
        <Route path="/USERHOMELOGIN" element={<USERHOMELOGIN />} />
        <Route path="/HOME" element={<HOME />} />
        <Route path="/FILE" element={<FILE />} />
        <Route path="/LOGIN" element={<LOGIN />} />
        <Route path="/DEV" element={<DEV />} />
        <Route path="/CONTACT" element={<CONTACT />} />
        <Route path="/ABOUT" element={<ABOUT />} />
        <Route path="/RES" element={<RESOURCES />} />
        <Route path="/UPLOAD" element={<UPLOAD />} />
        <Route path="/VIDEO" element={<VIDEO />} />
        <Route path="/COMMENT/VIDEO/:VIDEOONE/VIDEO/:VIDEOTWO/VIDEO/:VIDEOTHREE/VIDEO/:VIDEOFIVE/:VIDEONOISEREDUCE/:USERID/:ID" element={<COMMENT />} />
        <Route path="/COMMENT/VIDEONOISEREDUCE/:VIDEOONE/VIDEONOISEREDUCE/:VIDEOTWO/VIDEONOISEREDUCE/:VIDEOTHREE/VIDEONOISEREDUCE/:VIDEOFIVE/:VIDEONOISEREDUCE/:USERID/:ID" element={<COMMENT />} />
        <Route path="/COMMENT/VIDEONOISEREDUCE/:VIDEOONE/VIDEONOISEREDUCE/:VIDEOTWO/VIDEONOISEREDUCE/:VIDEOTHREE/VIDEONOISEREDUCE/:VIDEOFIVE/:VIDEOMUSIC/:USERID/:ID" element={<COMMENT />} />
        <Route path="/COMMENT/VIDEONOISEREDUCE/:VIDEOONE/VIDEONOISEREDUCE/:VIDEOTWO/VIDEONOISEREDUCE/:VIDEOTHREE/VIDEONOISEREDUCE/:VIDEOFIVE/:USERAUDIO/:USERID/:ID" element={<COMMENT />} />
        <Route path="/COMMENT/VIDEO/:VIDEOONE/VIDEO/:VIDEOTWO/VIDEO/:VIDEOTHREE/VIDEO/:VIDEOFIVE/:null/:USERID/:ID" element={<COMMENT />} />



        <Route path="/HOMEVIDEOVIDEO/VIDEO/:VIDEOONE/VIDEO/:VIDEOTWO/VIDEO/:VIDEOTHREE/VIDEO/:VIDEOFIVE/:VIDEONOISEREDUCE/:USERID/:ID" element={<HOMEVIDEOVIDEO />} />
        <Route path="/HOMEVIDEOVIDEO/VIDEONOISEREDUCE/:VIDEOONE/VIDEONOISEREDUCE/:VIDEOTWO/VIDEONOISEREDUCE/:VIDEOTHREE/VIDEONOISEREDUCE/:VIDEOFIVE/:VIDEONOISEREDUCE/:USERID/:ID" element={<HOMEVIDEOVIDEO />} />
        <Route path="/HOMEVIDEOVIDEO/VIDEONOISEREDUCE/:VIDEOONE/VIDEONOISEREDUCE/:VIDEOTWO/VIDEONOISEREDUCE/:VIDEOTHREE/VIDEONOISEREDUCE/:VIDEOFIVE/:VIDEOMUSIC/:USERID/:ID" element={<HOMEVIDEOVIDEO />} />
        <Route path="/HOMEVIDEOVIDEO/VIDEONOISEREDUCE/:VIDEOONE/VIDEONOISEREDUCE/:VIDEOTWO/VIDEONOISEREDUCE/:VIDEOTHREE/VIDEONOISEREDUCE/:VIDEOFIVE/:USERAUDIO/:USERID/:ID" element={<HOMEVIDEOVIDEO />} />
        <Route path="/HOMEVIDEOVIDEO/VIDEO/:VIDEOONE/VIDEO/:VIDEOTWO/VIDEO/:VIDEOTHREE/VIDEO/:VIDEOFIVE/:null/:USERID/:ID" element={<HOMEVIDEOVIDEO />} />



        <Route path="/USERCOMMENT/:ID" element={<USERCOMMENT />} />
        <Route path="/VIDEOUPLOAD" element={<VIDEOUPLOAD />} />
        <Route path="/USERUNIQUEID" element={<USERUNIQUEID />} />
        <Route path="/UPLOADEDVIDEO" element={<UPLOADEDVIDEO />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  </>
}
export default APP;