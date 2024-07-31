import { useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Newpage from "./pages/Newpage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={<Homepages />} />
            <Route path="new" element={<Newpage />} />
            {/* <Route path='edit' element={} /> */}
            {/* <Route path='diary' element={} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
