import React from "react";
import { createRoot } from 'react-dom/client';
import Router from "./components/Router";
import "./css/style.css";

const rootElement = document.getElementById('root');
   if (rootElement) {
   const root = createRoot(rootElement);
   root.render(
     <React.StrictMode>
     <Router />
     </React.StrictMode>
   );
} else {
   console.error("Root element not found");
}