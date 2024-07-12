import React from "react";
import Button from "./Input";

function Div({ className }) {
  return (
    <div className={className}>
      <div>안녕하세요1</div>
      <div>안녕하세요2</div>
      <div>안녕하세요3</div>
      <div>안녕하세요4</div>
      <Button $choice />
      <Button />
    </div>
  );
}

export default Div;
