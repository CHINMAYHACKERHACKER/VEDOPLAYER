import React from 'react';
import { useState } from 'react';
import LOGIN from "./LOGIN.js";
import CHAT from "./CHAT.js";

const FILE = () => {
    const [user, setUser] = useState();

    if (!user) {
        return <LOGIN onAuth={(user) => setUser(user)} />;
    } else {
        return <CHAT user={user} />;
    }
}
export default FILE;