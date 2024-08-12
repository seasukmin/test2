import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/Homepage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CartPgae from "./pages/CartPage/CartPgae";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<DetailPage />} />
          <Route path="cart" element={<CartPgae />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
