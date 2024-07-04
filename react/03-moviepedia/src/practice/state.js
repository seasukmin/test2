import { query } from "firebase/firestore";
import React, { useState } from "react";

// let value;
// function useState(initialValue) {
//   if (value === undefined) {
//     value = initialValue;
//   }
//   const setState = (newValue) => {
//     value = newValue;
//   };
//   return [value, setState];
// }

function State(props) {
  const [state, setState] = useState(0);

  const onClickHandler = () => {
    console.log("Click!");

    setState(1);
    if (state === 1) {
      console.log("실행될까?");
    }
  };
  return <h1 onClick={onClickHandler}>state 테스트</h1>;
}

export default State;
