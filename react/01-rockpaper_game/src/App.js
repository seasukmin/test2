import logo from "./logo.svg";
import "./App.css";
import resetButton from "./assets/ic-reset.svg";

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
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <img />
        <div></div>
        <img />
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
