import logo from "./logo.svg";
import "./App.css";
import resetButton from "./assets/ic-reset.svg";
import rockButton from "./assets/scissor.svg";

function App() {
  return (
    <div className="Container">
      <div className="nav">
        <h1>가위바위보</h1>
        <button>
          <img src={resetButton} />
        </button>
      </div>
      <div>
        <div>나</div>
        <div>:</div>
        <div>상대</div>
      </div>
      <div>
        <img className="red" src={rockButton} />
        <div>vs</div>
        <img src={rockButton} />
      </div>
      <div></div>
      <div></div>
      <div>
        <button>주먹</button>
        <button>가위</button>
        <button>보</button>
      </div>
    </div>
  );
}
export default App;
