import React from "react";
import HandIcon from "./HandIcon";
import "./HandButon.css";
function HandButton({ value, onClick }) {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <button className="HandButton" onClick={handleClick}>
      {/* <button className="HandButton" onClick={function(){이것도 가능}}> */}
      <HandIcon className="HandButton-icon" value={value} />
    </button>
  );
}

export default HandButton;
