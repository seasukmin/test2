import React from "react";
import Avatar from "./Avatar";
import { useLocation } from "react-router-dom";

function Writer() {
  const props = useLocation();
  const { state } = props;
  return (
    <div>
      <div>
        <div>{state.question.writer.name}</div>
        <div>{state.question.writer.level}</div>
      </div>
      <Avatar />
    </div>
  );
}

export default Writer;
