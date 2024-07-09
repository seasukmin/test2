import React, { useState } from "react";

function Cleanup(props) {
  const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing(!showing);
  };
  return (
    <div>
      <button onClick={onClick}>{showing ? "Hide" : ""}</button>
    </div>
  );
}

export default Cleanup;
