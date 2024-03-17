import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {reportAccessibility} from "./Components/utils/reportAccessibility";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ensure the correct argument is passed to reportAccessibility
reportAccessibility(React);

reportWebVitals();
