import { PrettyChatWindow } from "react-chat-engine-pretty";

const CHAT = (props) => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="b157b9e9-1343-43f4-9f61-1f84ff024426"
        username={props.user.username} // adam
        secret={props.user.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default CHAT;
