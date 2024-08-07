import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Newpage from "./pages/Newpage";
import {
  // addItem,
  // deleteItem,
  // fetchItems,
  initialState,
  reducer,
  // updateItem,
} from "./api/Itemreducer";
import DiaryPage from "./pages/DiaryPage";
import EditPage from "./pages/EditPage";
import Button from "./components/Button";
import LoginPage from "./pages/LoginPage";
import { getUserAuth } from "./api/firebase";
import { userInitialState, userReducer } from "./api/userReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "./store/diarySlice";
import { loginSucces, logout } from "./store/userSlice";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const items = useSelector((state) => state.diary.items);
  const dispatch = useDispatch();
  // const [userState, loginDispatch] = useReducer(userReducer, userInitialState);
  const auth = getUserAuth();
  const [user] = useAuthState(auth);

  // CREATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: user.email,
    };
    const param = {
      collectionName: "diary",
      addObj,
    };
    // await addItem("diary", addObj, dispatch);
    dispatch(addItem(param));
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

    const param = {
      collectionName: "diary",
      docId: values.docId,
      updateObj,
    };
    // await updateItem("diary", values.docId, updateObj, dispatch);
    dispatch(updateItem(param));
  };
  // DELETE
  const onDelete = async (values) => {
    const param = {
      collectionName: "diary",
      docId: values.docId,
    };
    dispatch(deleteItem(param));
    // await deleteItem("diary", docId, dispatch);
  };
  console.log(user);
  useEffect(() => {
    const param = {
      collectionName: "diary",
      queryOptions: {
        conditions: [
          {
            field: "userEmail",
            operator: "==",
            value: user ? user.email : "admin@gmail.com",
          },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
    };
    dispatch(fetchItems(param));
  }, [user]);

  console.log(user);
  useEffect(() => {
    // serialize(직렬화): 데이터를 저장할 때 저장할 수 있는 형태로 변환하는 것
    // serialize가 안되는 타입 : Promise, Symbol, Map, Set, function, class
    if (user) {
      dispatch(loginSucces([user.email, true, null]));
    } else {
      dispatch(logout([null, false, null]));
    }
  }, [user]);
  return (
    // <DiaryStateContext.Provider value={{ auth }}>
    <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
      <BrowserRouter>
        <div className="App">
          {/* <Button text={'로그인'} className='btn_login' onClick={goLogin} /> */}
          <Routes>
            <Route path="/">
              <Route index element={<Homepages />} />
              <Route path="new" element={<Newpage />} />
              <Route path="edit/:id" element={<EditPage />} />
              <Route path="diary/:id" element={<DiaryPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DiaryDispatchContext.Provider>
    // </DiaryStateContext.Provider>
  );
}

export default App;
