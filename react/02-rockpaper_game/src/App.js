import logo from "./logo.svg";
import "./App.css";
import reset from "./assets/ic-reset.svg";
import HandIcon from "./HandIcon";
function App() {
  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img className="App-reset" src={reset} />
      <div className="App-scores">
        <div className="score">
          <div className="Score-num">0</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="score">
          <div className="Score-num">0</div>
          <div className="Score-name">상대</div>
        </div>
      </div>
      <div className="Box App-box">
        {/* 가위바위보 내는곳 */}
        <div className="App-hands">
          <div className="Hand">
            <HandIcon />
          </div>
          <div className="App-versus">vs</div>
          <div className="Hand">
            <HandIcon />
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet"></div>
        {/* 기록 */}
        <div className="App-history"></div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
