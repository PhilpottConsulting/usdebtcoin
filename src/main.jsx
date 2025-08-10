// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { AppKitProvider } from './appKitConfig.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppKitProvider>
        <App />  
    </AppKitProvider> 
  </React.StrictMode>
);
