import logo from "./logo.svg";
import "./App.css";
import resetButton from "./assets/ic-reset.svg";
import rockButton from "./assets/rock.svg";
import sisserButton from "./assets/scissor.svg";
import paperButton from "./assets/paper.svg";

function App() {
  return (
    <div className="Container">
      <div className="nav">
        <h1>가위바위보</h1>
        <button>
          <img src={resetButton} />
        </button>
      </div>
      <div className="Point">
        <div>나</div>
        <div>:</div>
        <div>상대</div>
      </div>
      <div className="Main">
        <img src={rockButton} />
        <div>vs</div>
        <img src={rockButton} />
      </div>
      <div>
        배점
        <input type="text" />매
      </div>
      <div>승부기록</div>
      <div>
        <button>
          <img src={rockButton} />
          주먹
        </button>
        <button>
          <img src={sisserButton} />
          가위
        </button>
        <button>
          <img src={paperButton} />보
        </button>
      </div>
    </div>
  );
}
export default App;
