import React from 'react';
import "./ABOUT.css";

const ABOUT = () => {
    return (

        <div>
            <title>About Us - Dev Community</title>
            <link rel="stylesheet" type="text/css" href="styles.css" />
            <header className="bg-dark">
                <h3>Guidelines</h3>
            </header><br />
            <main>
                <ul>
                    <li>In Vid Website There Are Three Features<br /> 1) Only Noise Reduction: This feature allows users to reduce background noise in their Videos(Select Only Video)<br />2) Noise Reduction+Background Music: This feature allows users to reduce background noise and add Background Music to Video(Select Both Video(mp4) and Audio(mp3))<br />3) Only Background Music: This feature allows users to add Background Music to Video without Noise Reduction(Select Both Video(mp4) and Audio(mp3)).<br /><li>You can Upload Edited Video also But Dont Select Any Option Just Upload Edited Video.</li><br /><li>Dont Add Background Music In video When Selecting Only noise Reduction Option.</li><br /><li>Speak Little Louder.</li></li><br />
                    <p><b>Certainly, here are some strict guidelines to follow when uploading videos to avoid uploading offensive or inappropriate content:</b></p>
                    <li>Do not upload any explicit content, such as pornography, nudity, or sexually suggestive material.</li><br />
                    <li>Avoid uploading videos that contain hate speech, harassment, or bullying. This includes content that is discriminatory or offensive towards any particular group or individual.</li><br />
                    <li>Refrain from uploading videos that promote violence, self-harm, or dangerous activities.</li><br />
                    <li>Avoid misleading or deceptive content that could harm or misinform viewers.</li><br />
                    <li>Ensure that your video does not violate any laws or regulations.</li><br />
                    <li>If You Dont Follow The Above Strict Guidelines Your Account Will Be Deleted</li>
                </ul>
            </main>
        </div>
    )
}
export default ABOUT;