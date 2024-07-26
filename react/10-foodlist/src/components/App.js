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
  const t = useTranslate();

  const handleKeywordChange = (e) => {
    setkeyword(e.target.value);
  };
  const handleSubmitChange = async (e) => {
    e.preventDefault();
    if (keyword === "") {
      handleLoad({ order: order, limit: LIMIT, lq: undefined });
    } else {
      const resultData = await getSearchDatas("food", {
        limit: LIMIT,
        keyword: keyword,
      });
      setItems(resultData);
    }
    // setItems(foodItems.filter(({ title }) => title.includes(keyword)));
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
  // updateDatas를 통해 업데이트된 result 값이 넘어와서 화면에 실시간으로 표현해주는 식
  //  현재 아이템들의 인덱스를 찾아서 해당 아이템들 중 업데이트 된 녀석과 id가 같은 녀석의 인덱스 리턴해주는 값은 현재 아이템들 중 0부터(즉, 그 이전) 선택된 녀석이전까지와 선택해서 업데이트된 녀석 그리고 선택된 녀석의 인덱스에서 +1된 값
  // 이전 + 업데이트된 녀석 + 이후 이런 구조로 리턴해서 화면에 뿌려준다.
  const handleDelete = async (docId, imgUrl) => {
    const { result, message } = await deleteDatas("food", docId, imgUrl);
    if (!result) {
      alert(message);
      return false;
    }
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
  };
  //  삭제식인데 컬렉션 food에 있는 docId와 imgUrl을 받아서 스토리지에서 이미지
  // 삭제하고 firebase에서 문서도 삭제하기
  // 그리고 setItems에 이전 녀석들 즉, 현재 녀석들을 필터를 통해서 줄여서 화면에 표시를 하는데 그 중에 기존 문서 docId들과 삭제하기 위해서 선택된 녀석에 docId 같지 않으면 줄인다 즉, item.docId 중 삭제된걸 제외하고 화면에 표시한다.

  const handleAddSuccess = (resultData) => {
    setItems((prevItems) => [resultData, ...prevItems]);
  };
  // 흠.. resultData에 addDatas에 값이 넘어오고 그 값을 그 이전 값들에 바로 반영하는식.. 화면에 바로 반영해주는 식

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };
  // 이해안됨.. 왜 핸들로드 안에 객체로 저걸 넣어준거지...?
  // 생각을 해보면 order는 말그대로 어떤 녀석을 어떤 정렬로 가져올지.. limit은 한번에 몇개, lq는 lastqeury를 알려줘서 거기에 도달하면 그 다음것부터 가져오게 하는 것..
  // 문제는 내가 이걸 안보고 만들 수 있을까??...

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    // 여긴 lq가 필요없다 왜냐하면 LIMIT으로 설정한 최초 5개만 나오면 되기 때문
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
