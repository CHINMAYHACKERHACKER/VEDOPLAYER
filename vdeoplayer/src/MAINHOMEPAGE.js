import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "./IMAGE/comedy-tv-high-resolution-logo-black-on-transparent-background.png";

const MAINHOMEPAGE = () => {
    const [userLogin, setUserLogin] = useState([]);
    const [userID, setUserID] = useState('');
    const history = useNavigate();

    const handleSignUp = () => {
        history("/USERHOMELOGIN");
    }

    const isAndroid = /Android/.test(navigator.userAgent); // Check if user agent corresponds to an Android device

    useEffect(() => {
        axios.get(`http://localhost:3001/USERLOGIN`)
            .then((res) => {
                console.log(res.data);
                setUserLogin(res.data);
            });
    }, []);

    useEffect(() => {
        const storedUserID = localStorage.getItem('USERGENERATEDID');
        setUserID(storedUserID);
    }, []);

    useEffect(() => {
        userLogin.forEach((value) => {
            if (value.USERGENERATEDID === userID) {
                history("/video");
            }
        });
    }, [userLogin, userID, history]);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f2f2f2',
        minHeight: '100vh',
    };

    const headerStyle = {
        marginBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const logoStyle = {
        marginBottom: '20px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        order: -1, // Brings the logo above the title
        backgroundImage: `url(${logo})`, // Replace "your-image-url" with the actual URL of the image
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px', // Increased marginBottom for more spacing
    };

    const descriptionStyle = {
        fontSize: '16px',
        marginBottom: '30px', // Increased marginBottom for more spacing
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    };

    const statementStyle = {
        color: 'Purple	',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        animation: 'typing-animation 8s infinite linear', // Modified animation duration and timing function
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderRight: '1px solid #000',
        width: '100%',
        textAlign: 'center', // Center-align the statement
    };

    // CSS keyframes for typing animation
    const typingAnimation = `
        @keyframes typing-animation {
          0% {
            width: 0;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 100%;
          }
        }
        
        @keyframes blink-caret {
          from, to {
            border-color: transparent;
          }
          50% {
            border-color: #000;
          }
        }
    `;

    // CSS styles for Android devices
    const androidDescriptionStyle = {
        marginBottom: '10px', // Adjust the marginBottom for smaller screens
        display: 'block', // Add display: block to ensure the description appears on a new line
        textAlign: 'center', // Center-align the description on smaller screens
        wordBreak: 'break-word', // Add wordBreak to break the statement and show it on the next line
    };

    const contentStyle = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const buttonContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '-250px', // Increased marginTop for spacing from description
    };

    const buttonStyle = {
        display: 'inline-block',
        width: '200px',
        height: '40px',
        margin: '0 10px',
        borderRadius: '20px',
        backgroundColor: '#ffcc00',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '14px',
        textDecoration: 'none',
    };

    const footerStyle = {
        marginTop: 'auto',
    };

    const footerTextStyle = {
        fontSize: '12px',
        color: '#888',
        textAlign: 'center', // Center-align the text
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <div style={logoStyle}></div>
                <h1 style={titleStyle}>Comedy TV</h1>
                <p style={isAndroid ? { ...descriptionStyle, ...androidDescriptionStyle } : descriptionStyle}>
                    <span style={statementStyle}>
                        <strong>The funniest comedy videos<br /> and hilarious shows<br /> all in one place!</strong>
                    </span>
                </p>
            </div>

            <div style={contentStyle}>
                <div style={buttonContainerStyle}>
                    <button className="btn btn-primary" style={buttonStyle} onClick={handleSignUp}>
                        Sign Up
                    </button>
                </div>
            </div>

            <div style={footerStyle}>
                <p style={footerTextStyle}>
                    &copy; 2023 Comedy TV. All rights reserved.
                </p>
            </div>
            <style>{typingAnimation}</style>
        </div>
    );
}

export default MAINHOMEPAGE;
