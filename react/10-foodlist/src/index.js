import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { LocaleProvider } from "./contexts/LocaleConext";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <LocaleProvider defaultValue="ko">
      <App />
    </LocaleProvider>
  </Provider>
);
