import { useEffect, useState } from "react";
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
  updateDatas,
} from "../api/firebase";
import { getStorage } from "firebase/storage";
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
  const [Items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);
  const [keyword, setkeyword] = useState([]);

  const handleKeywordChange = (e) => {
    setkeyword(e.target.value);
  };
  const handleSubmitChange = (e) => {
    e.preventDefault();
    console.log(foodItems);
    const searchItems = foodItems.filter(function (item) {
      return item.title.includes(keyword);
    });
    setItems(searchItems);
    setItems(foodItems.filter(({ title }) => title.includes(keyword)));
  };
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "food",
      options
    );

    // const handleLoad =async ()=>{
    //   const resultData =  await getDatasByOrderLimit(
    //     "food",
    //     {options
    //   );
    // }
    const getresult = await getDatas("food");
    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }
    if (!lastQuery) {
      setHasNext(false);
    }
    setLq(lastQuery);
    foodItems = getresult;
  };
  //  기존꺼 유지하고 더보기 눌렀을때 추가로 나오게 하는 방법이 위에꺼
  // lastQurey가 없으면 false!!
  const handleNewestClick = () => setOrder("createdAt");
  const handlecalorieClick = () => setOrder("calorie");

  const handleUpdateSuccess = (result) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((Items) => Items.id === result.id);
      return [
        ...prevItems.slice(0, splitIdx),
        result,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  const handleDelete = async (docId, imgUrl) => {
    const { result, message } = await deleteDatas("food", docId, imgUrl);
    if (!result) {
      alert(message);
      return false;
    }
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };

  const handleAddSuccess = (resultData) => {
    setItems((prevItems) => [resultData, ...prevItems]);
  };

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
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
              최신순
            </AppSortButton>
            <AppSortButton
              className="AppSortButton"
              selected={order === "calorie"}
              onClick={handlecalorieClick}
            >
              칼로리순
            </AppSortButton>
          </div>
        </div>
        {Items.map((Items) => {
          return (
            <FoodList
              key={Items.id}
              Items={Items}
              handleUpdateSuccess={handleUpdateSuccess}
              handleDelete={handleDelete}
              onUpdate={updateDatas}
            />
          );
        })}
        {hasNext && (
          <button
            className="App-load-more-button"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더 보기
          </button>
        )}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// <nav className="App-nav">
// <div className="App-nav-container">
//   <img className="App-logo" src={logoImg} />
// </div>
// </nav>
// <div className="App-container">
// <div className="App-ReviewForm">
//   <FoodForm
//   // onSubmit={addDatas}
//   // handleSubmitSuccess={handleAddSuccess}
//   />
// </div>
// <div className="App-sorts">
//   {/* <AppSortButton
//   selected={order === 'createdAt'}
//   onClick={handleNewestClick}
// >
//   {t('newest')}
// </AppSortButton>
// <AppSortButton
//   selected={order === 'rating'}
//   onClick={handleBestClick}
// >
//   {t('best')}
// </AppSortButton> */}
// </div>
// <div className="App-ReviewList">
//   <FoodList
//   // items={items}
//   // handleDelete={handleDelete}
//   // onUpdate={updateDatas}
//   // onUpdateSuccess={handleUpdateSuccess}
//   />
//   {/* {hasNext && (<button className='App-load-more-button' onClick={handleMoreClick}>
//   더보기
// </button>)} */}
//   <button
//     className="App-load-more-button"
//     // onClick={handleMoreClick}
//     // disabled={!hasNext}
//   >
//     {/* {t('load more')} */}
//   </button>
// </div>
// </div>
// <footer className="App-footer">
// <div className="App-footer-container">
//   {/* {t('terms of service')} | {t('privacy policy')} */}
//   {/* <LocaleSelect /> */}
// </div>
{
  /* </footer> */
}
