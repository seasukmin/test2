import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import { getDatas } from "./firebase";
import mockItems from "./mock.json";
import { useEffect, useState } from "react";

function AppSortButton({ children }) {
  return <button className="AppSortButton selected">{children}</button>;
}

function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("movie");
    console.log(resultData);
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  // 상태변경 함수를 넣어준다?[]요안에
  // 랜더링 될때를 알아야한다. 무한루프에 빠지기 쉬우니까!
  // 무한루프에 빠지면 firebase용량을 금방 넘어선다.
  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm />
        </div>
        <div className="App-sorts">
          <AppSortButton>최신순</AppSortButton>
          <AppSortButton>베스트순</AppSortButton>
          {/* 요안에 문자열뿐아니라 변수도 들어갈 수 있음 */}
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          <button className="App-load-more-button">더보기</button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
