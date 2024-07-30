import React from "react";
import search from "../assets/community.svg";
import "../App.css";

function ChatMessage({ message, auth }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth?.currentUser.uid ? "sent" : "received";
  console.log(photoURL);
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
