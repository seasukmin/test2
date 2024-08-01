import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Newpage from "./pages/Newpage";
import { addItem, fetchItems, initialState, reducer } from "./api/Itemreducer";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: "seh9210@gmail.com",
    };
    await addItem("diary", addObj, dispatch);
  };
  // READ
  // UPDATE
  // DELETE
  useEffect(() => {
    fetchItems(
      "diary",
      {
        conditions: [
          { field: "userEmail", operator: "==", value: "seh9210@gmail.com" },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
      dispatch
    );
  }, []);
  return (
    <DiaryStateContext.Provider value={state.items}>
      <DiaryDispatchContext.Provider value={{ onCreate }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/">
                <Route index element={<Homepages />} />
                <Route path="new" element={<Newpage />} />
                {/* <Route path='edit' element={} /> */}
                {/* <Route path='diary' element={} /> */}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;