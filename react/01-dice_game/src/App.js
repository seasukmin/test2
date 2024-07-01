import "./App.css";
import logo from "./assets/logo.png";
import blueOne from "./assets/dice-blue-1.svg";
import redOne from "./assets/dice-red-1.svg";

// 함수형 컴포넌트 : 컴포넌트를 함수형으로 만든것(변수형으로도 만들 수 있다.)
// 함수형 컴포넌트를 만들때에는 함수명의 첫 글자는 반드시 대문자여야 한다.
// 함수형 컴포넌트 안에서는 JSX 문법으로 만든 리액트 엘리먼트를 리턴해줘야 한다.

const style = {
  backgroundColor: "#d9d9d9",
  color: "yellow",
};

// for ==> htmlFor, onclick/onblur ==> onClick/onBlur
function App() {
  return (
    <div className="App">
      <div>
        <div>
          <img src={logo} className="App-logo" />
          <h1 className="App-title">주사위 게임</h1>
        </div>
        <div>
          <button className="App-button blue">던지기</button>
          <button className="App-button red">처음부터</button>
        </div>
      </div>
      <div>
        <div>
          <h2>나</h2>
          <img src={blueOne} />
          <h2>총점</h2>
          <p>4</p>
          <h2>기록</h2>
          <p>1, 3</p>
        </div>
        <div>
          <h2>상대</h2>
          <img src={redOne} />
          <h2>총점</h2>
          <p>6</p>
          <h2>기록</h2>
          <p>2, 4</p>
        </div>
      </div>
    </div>
  );
}
export default App;
