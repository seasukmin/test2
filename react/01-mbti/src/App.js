import logo from "./logo.svg";
import "./App.css";
import Box from "./Box";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="head">새 컬러 등록하기</h1>
        <div className="Xbox">🛠</div>
      </div>
      <div className="mbtiBoxes">
        <div class="MBTI">MBTI</div>
        <Box className="mbtiBox" name="a" />
        <Box className="mbtiBox" name="b" />
        <Box className="mbtiBox" name="c" />
        <Box className="mbtiBox" name="d" />
        <Box className="mbtiBox" name="e" />
        <Box className="mbtiBox" name="f" />
        <Box className="mbtiBox" name="g" />
        <Box className="mbtiBox" name="h" />
      </div>
      <div className="colorBoxes">
        <div className="colorName">컬러</div>
        <div className="colorReset">🎈</div>
      </div>
      <div>
        <input value="#94959" className="inputBox"></input>
      </div>
      <div>
        <div className="rankColor">컬러 등록</div>
      </div>
    </div>
  );
}

export default App;
