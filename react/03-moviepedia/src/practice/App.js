import { useEffect, useState } from "react";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import mockItems from "./mock.json";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
} from "./firebase";

const LIMIT = 10;

function AppSortButton({ children, onClick, selected }) {
  let isSelected = "";
  if (selected) {
    isSelected = "selected";
  }
  return {
    // <button className={`AppSortButton ${isSelected}`} onClick={onClick}>
    // {children}
    // </button>
  };
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder]=useState("createdAt")
  const [lq, setlq] = useState();
  const [hasNext, setHasNext]= useState(true);
}
 const handleLoad = async(option) => {
  const { resultData, lastQuery} = await getDatasByOrderLimit
 }