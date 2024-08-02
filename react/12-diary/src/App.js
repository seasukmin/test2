import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Newpage from "./pages/Newpage";
import {
  addItem,
  deleteItem,
  fetchItems,
  initialState,
  reducer,
  updateItem,
} from "./api/Itemreducer";
import DiaryPage from "./pages/DiaryPage";
import EditPage from "./pages/EditPage";
import { deleteDatas } from "./api/firebase";

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
  const onUpdate = async (values) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    await updateItem("diary", values.docId, updateObj, dispatch);
  };
  // DELETE

  const onDelete = async (values) => {
    await deleteItem("diary", values.docId, dispatch);
  };
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
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/">
                <Route index element={<Homepages />} />
                <Route path="new" element={<Newpage />} />
                <Route path="edit/:id" element={<EditPage />} />
                <Route path="diary/:id" element={<DiaryPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
