import React, { useReducer } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { down, up } from "./counterSlice";

// function reducer(state, action) {
//   if (action.type === "up") {
//     return { ...state, value: state.value + action.step };
//   }
//   return state;
// }
// const initialState = { value: 0 };
function Counter() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  // const count = useSelector((state) => {
  //   console.log(state);
  //   return state.value;
  // });
  const plus = useSelector((state) => state.plus);
  const minus = useSelector((state) => state.minus);
  return (
    <>
      <div>
        <button
          onClick={() => {
            // dispatch({ type: "up", step: 2 });
            // dispatch({ type: "counter/up", step: 2 });
            dispatch(up(2));
          }}
        >
          +
        </button>
        {/* {state.value} */}
        {plus}
      </div>
      <div>
        <button
          onClick={() => {
            // dispatch({ type: "up", step: 2 });
            // dispatch({ type: "counter/up", step: 2 });
            dispatch(down(2));
          }}
        >
          -
        </button>
        {/* {state.value} */}
        {minus}
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
