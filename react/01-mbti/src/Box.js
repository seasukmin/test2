import React from "react";

const textStyle = {
  fontSize: "40px",
  fontWeight: "400",
};
function Box({ name, className }) {
  return (
    <div style={textStyle} className={className}>
      {name}
    </div>
  );
}
export default Box;
