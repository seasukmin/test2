import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import resetButton from "./assets/ic-reset.svg";
import rockButton from "./assets/rock.svg";
import sisserButton from "./assets/scissor.svg";
import paperButton from "./assets/paper.svg";
import Board from "./Board";

function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  // const [Mynum, setMynum] = useState(1);
  // const [myNum, setMyNum] = useState(1);
  // const [otherNum, setOtherNum] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [othergameHistory, setOtherGameHistory] = useState([]);
  const [gameHistory1, setGameHistory1] = useState([]);
  const [othergameHistory1, setOtherGameHistory1] = useState([]);
  const [myTotalCount, setMyTotalCount] = useState(0);
  const [otherTotalCount, setOtherTotalCount] = useState(0);
  const [xNumber, setxNumber] = useState(1);

  const nextMyNum1 = 1;
  const nextOtherNum1 = random(3);
  function RockScissorPaper1() {
    let myCount = 0;
    let otherCount = 0;
    if (parseInt(nextMyNum1 - nextOtherNum1) == -1) {
      myCount = 1 * xNumber;
      otherCount = -1 * xNumber;
    } else if (parseInt(nextMyNum1 - nextOtherNum1) == -2) {
      myCount = -1 * xNumber;
      otherCount = 1 * xNumber;
    } else if (parseInt(nextMyNum1 - nextOtherNum1) == 0) {
      myCount = 0;
      otherCount = 0;
    }
    // console.log((count ));
    setMyTotalCount((prevCount) => prevCount + myCount);
    setOtherTotalCount((prevCount) => prevCount + otherCount);
    setGameHistory([nextMyNum1]);
    setOtherGameHistory([nextOtherNum1]);
    setGameHistory1([...gameHistory1, nextMyNum1]);
    setOtherGameHistory1([...othergameHistory1, nextOtherNum1]);
  }
  const nextMyNum2 = 2;
  const nextOtherNum2 = random(3);
  function RockScissorPaper2() {
    let myCount = 0;
    let otherCount = 0;
    if (parseInt(nextMyNum2 - nextOtherNum2) == -1) {
      myCount = 1 * xNumber;
      otherCount = -1 * xNumber;
    } else if (parseInt(nextMyNum2 - nextOtherNum2) == -2) {
      myCount = -1 * xNumber;
      otherCount = 1 * xNumber;
    } else if (parseInt(nextMyNum2 - nextOtherNum2) == 0) {
      myCount = 0;
      otherCount = 0;
    }
    // console.log((count ));
    setMyTotalCount((prevCount) => prevCount + myCount);
    setOtherTotalCount((prevCount) => prevCount + otherCount);
    setGameHistory([nextMyNum2]);
    setOtherGameHistory([nextOtherNum2]);
    setGameHistory1([...gameHistory1, nextMyNum2]);
    setOtherGameHistory1([...othergameHistory1, nextOtherNum2]);
  }
  const nextMyNum3 = 3;
  const nextOtherNum3 = random(3);
  function RockScissorPaper3() {
    let myCount = 0;
    let otherCount = 0;
    if (parseInt(nextMyNum3 - nextOtherNum3) == -1) {
      myCount = 1 * xNumber;
      otherCount = -1 * xNumber;
    } else if (parseInt(nextMyNum3 - nextOtherNum3) == -2) {
      myCount = -1 * xNumber;
      otherCount = 1 * xNumber;
    } else if (parseInt(nextMyNum3 - nextOtherNum3) == 0) {
      myCount = 0;
      otherCount = 0;
    }
    // console.log((count ));
    setMyTotalCount((prevCount) => prevCount + myCount);
    setOtherTotalCount((prevCount) => prevCount + otherCount);
    setGameHistory([nextMyNum3]);
    setOtherGameHistory([nextOtherNum3]);
    setGameHistory1([...gameHistory1, nextMyNum3]);
    setOtherGameHistory1([...othergameHistory1, nextOtherNum3]);
  }
  const xNumberChange = (el) => {
    const value = parseInt(el.target.value);
    setxNumber(value);
  };
  const handleClearClick = () => {
    setGameHistory([]);
    setOtherGameHistory([]);
    setMyTotalCount(0);
    setOtherTotalCount(0);
    setGameHistory1([]);
    setOtherGameHistory1([]);
  };
  return (
    <div className="Container">
      <div className="nav">
        <h1>가위바위보</h1>
        <button class="buttonClass" onClick={handleClearClick}>
          <img src={resetButton} />
        </button>
      </div>
      <div className="Point">
        <Board point={myTotalCount} />
        <div>:</div>
        <Board point={otherTotalCount} />
      </div>
      <div className="Main">
        <div>{gameHistory} </div>
        <div>vs</div>
        <div>{othergameHistory}</div>
      </div>
      <div className="xnumber">
        배점
        <input
          type="number"
          min="1"
          max="5"
          value={xNumber}
          onChange={xNumberChange}
        />
        매
      </div>
      <div className="whowin">
        <p>승부기록</p>
        <div>{myTotalCount}</div>
      </div>
      <div className="footer">
        <button class="rock" onClick={RockScissorPaper1}>
          <img src={rockButton} />
          주먹
        </button>
        <button class="scissor" onClick={RockScissorPaper2}>
          <img src={sisserButton} />
          가위
        </button>
        <button class="paper" onClick={RockScissorPaper3}>
          <img src={paperButton} />보
        </button>
      </div>
    </div>
  );
}
export default App;
