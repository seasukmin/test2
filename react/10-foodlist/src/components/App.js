import { useEffect, useState } from "react";
import "./App.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import searchImg from "../assets/ic-search.png";
import { addDatas, getDatas } from "../api/firebase";

let foodList;
function App() {
  const [Items, setItems] = useState([]);
  async function handleLoad() {
    const snapshot = await getDatas("food");
    setItems(snapshot);
  }
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm onSubmit={addDatas} />
        </div>
        <div className="App-filter">
          <input
            className="App-Input"
            style={{
              backgroundImage: `url(${searchImg} )`,
              backgroundRepeat: "no-repeat",
            }}
          />
          <ul className="App-filterdle">
            <li>최신순</li>
            <li>칼로리순</li>
          </ul>
        </div>
        {Items.map((Items) => {
          return <FoodList key={Items.id} Items={Items} />;
        })}
        <button>더 보기</button>
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
