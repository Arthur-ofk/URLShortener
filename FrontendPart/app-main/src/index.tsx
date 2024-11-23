import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./Store/store";
import { Provider } from "react-redux";
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store} >
      <App />
      </Provider>
      
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}