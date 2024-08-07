import { useEffect, useState, useTransition } from "react";
import "./App.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import searchImg from "../assets/ic-search.png";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
  getSearchDatas,
  updateDatas,
} from "../api/firebase";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "../hooks/useTranslate";
import useAsync from "../hooks/useAsync";
import { useDispatch, useSelector } from "react-redux";
import {
  addItems,
  fetchItems,
  setOrder,
  updateItems,
} from "../store/foodSlice";
import { collection } from "firebase/firestore";

let isSelected;
function AppSortButton({ children, onClick, selected }) {
  isSelected = "";
  if (selected) {
    isSelected = "selected";
  }
  return (
    <button className={`AppsortButton ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}

const LIMIT = 5;
let foodItems;
function App() {
  const dispatch = useDispatch();
  const { items, order, lq, hasNext, isLoading } = useSelector(
    (state) => state.food
  );
  console.log(lq);
  // console.log(items);
  // const [Items, setItems] = useState([]);
  // const [order, setOrder] = useState("createdAt");
  // const [lq, setLq] = useState();
  // const [hasNext, setHasNext] = useState(true);
  const [keyword, setkeyword] = useState([]);
  const t = useTranslate();
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, loadingError, getDatasAsync] =
  // useAsync(getDatasByOrderLimit);

  const handleKeywordChange = (e) => {
    setkeyword(e.target.value);
  };
  const handleSubmitChange = async (e) => {
    e.preventDefault();
    if (keyword === "") {
      handleLoad({ order: order, limit: LIMIT });
    } else {
      const resultData = await getSearchDatas("food", {
        limit: LIMIT,
        keyword: keyword,
      });
      // setItems(resultData);
    }
    // setItems(foodItems.filter(({ title }) => title.includes(keyword)));
  };

  const handleLoad = async (options) => {
    dispatch(fetchItems({ collectionName: "food", queryOptions: options }));
    //   // setIsLoading(true);
    //   // const { resultData, lastQuery } = await getDatasByOrderLimit(
    //   //   "food",
    //   //   options
    //   // );
    //   // setIsLoading(false);
    //   const { resultData, lastQuery } = await getDatasAsync("food", options);

    //   const getresult = await getDatas("food");
    //   if (!options.lq) {
    //     // setItems(resultData);
    //   } else {
    //     // setItems((prevItems) => [...prevItems, ...resultData]);
    //   }
    //   if (!lastQuery) {
    //     setHasNext(false);
    //   }
    //   setLq(lastQuery);
    //   foodItems = getresult;
  };

  const handleMoreClick = async () => {
    const queryOptions = {
      condition: [],
      orderBys: [{ field: order, direction: "desc" }],
      lastQuery: lq,
      limits: LIMIT,
    };
    handleLoad(queryOptions);
  };
  const handleNewestClick = () => dispatch(setOrder("createdAt"));
  const handlecalorieClick = () => dispatch(setOrder("calorie"));

  const handleUpdate = (collectionName, docId, updateObj, imgUrl) => {
    dispatch(updateItems({ collectionName, docId, updateObj, imgUrl }));
  };

  const handleUpdateSuccess = (result) => {
    console.log(result);
    // setItems((prevItems) => {
    //   const splitIdx = prevItems.findIndex((Items) => Items.id === result.id);
    //   return [
    //     ...prevItems.slice(0, splitIdx),
    //     result,
    //     ...prevItems.slice(splitIdx + 1),
    //   ];
    // });
  };

  const handleDelete = async (docId, imgUrl) => {
    const { result, message } = await deleteDatas("food", docId, imgUrl);
    if (!result) {
      alert(message);
      return false;
    }
    const queryOptions = {
      condition: [],
      orderBys: [{ field: order, direction: "desc" }],
      lastQuery: undefined,
      limits: LIMIT,
    };
    handleLoad(queryOptions);
    // setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  const handleAddSuccess = (resultData) => {
    const queryOptions = {
      condition: [],
      orderBys: [{ field: order, direction: "desc" }],
      lastQuery: undefined,
      limits: LIMIT,
    };
    handleLoad(queryOptions);
    // setItems((prevItems) => [resultData, ...prevItems]);
  };

  useEffect(() => {
    // handleLoad({ order: order, limit: LIMIT, lq: undefined });
    const queryOptions = {
      condition: [],
      orderBys: [{ field: order, direction: "desc" }],
      lastQuery: undefined,
      limits: LIMIT,
    };
    handleLoad(queryOptions);
  }, [order]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm onSubmit={addDatas} handleAddSuccess={handleAddSuccess} />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSubmitChange}>
            <input
              className="App-search-input"
              onChange={handleKeywordChange}
            />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              className="AppSortButton"
              selected={order === "createdAt"}
              onClick={handleNewestClick}
              disabled={isSelected}
            >
              {t("newest")}
            </AppSortButton>
            <AppSortButton
              className="AppSortButton"
              selected={order === "calorie"}
              onClick={handlecalorieClick}
            >
              {t("calorie")}
            </AppSortButton>
          </div>
        </div>
        {items.map((Items) => {
          return (
            <FoodList
              key={Items.id}
              Items={Items}
              handleUpdateSuccess={handleUpdateSuccess}
              handleDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          );
        })}
        {hasNext && (
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!isLoading}
          >
            {t("load more")}
          </button>
        )}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <LocaleSelect />
          <div className="App-footer-menu">
            {t("terms of service")} | {t("privary policy")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
