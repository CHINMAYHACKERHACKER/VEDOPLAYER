import { PrettyChatWindow } from "react-chat-engine-pretty";
import { Link } from 'react-router-dom';


const CHAT = (props) => {
  const METHOD=()=>{
    window.open("http://localhost:5000", '_blank').focus();
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark py-0">
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
                <Link className="nav-link text-white" onClick={METHOD}>Video call</Link>
              </li>
              <li className="nav-item">
             <Link className="nav-link text-white" to="/DEV" target="_blank">Developers</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="b157b9e9-1343-43f4-9f61-1f84ff024426"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
    </>
  );
}
export default CHAT;
