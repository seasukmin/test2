import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MainPages from "./pages/MainPages";
import AboutPage from "./pages/AboutPage";
import { GlobalStyle } from "./theme/GlobalStyle";
import { ThemeChangeProvider } from "./context/ThemeContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeChangeProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<MainPages />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </ThemeChangeProvider>
    </BrowserRouter>
  );
}

export default App;
