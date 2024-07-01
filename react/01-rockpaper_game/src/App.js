import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import resetButton from "./assets/ic-reset.svg";
import rockButton from "./assets/rock.svg";
import sisserButton from "./assets/scissor.svg";
import paperButton from "./assets/paper.svg";
import Board from "./Board";

const [Mynum, setMynum] = useState(1);
function App() {
  function RockScissorPaper() {}

  return (
    <div className="Container">
      <div className="nav">
        <h1>가위바위보</h1>
        <button class="buttonClass">
          <img src={resetButton} />
        </button>
      </div>
      <div className="Point">
        <Board point="g" />
        <div>:</div>
        <Board point="k" />
      </div>
      <div className="Main">
        <img src={rockButton} />
        <div>vs</div>
        <img src={rockButton} />
      </div>
      <div className="xnumber">
        배점
        <input type="text" />매
      </div>
      <div className="whowin">승부기록</div>
      <div className="footer">
        <button class="rock" onClick={RockScissorPaper}>
          <img src={rockButton} />
          주먹
        </button>
        <button class="scissor">
          <img src={sisserButton} />
          가위
        </button>
        <button class="paper">
          <img src={paperButton} />보
        </button>
      </div>
    </div>
  );
}
export default App;
