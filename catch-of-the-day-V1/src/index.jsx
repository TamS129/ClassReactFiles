import React from 'react';
import { createRoot } from 'react-dom/client';
import StorePicker from './components/StorePicker';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <StorePicker />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
