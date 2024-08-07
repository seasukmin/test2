import React from "react";
import "./Button.css";

function Button({ text, onClick, type, className, isAuthenticated }) {
  const btnClass = ["positive", "negative"].includes(type) ? type : "default";
  const loginClass = className ? "btn_login" : "";
  return (
    <button className={`btn btn_${btnClass} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

//셀프클로징?
