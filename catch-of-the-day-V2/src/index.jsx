import React from "react";
import { createRoot } from 'react-dom/client';
import StorePicker from "./components/StorePicker";
import App from "./components/App"; 
import "./css/style.css";

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}