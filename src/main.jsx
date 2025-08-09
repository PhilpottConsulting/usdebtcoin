// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import ReownProvider from './ReownProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReownProvider>
        <App />  
    </ReownProvider> 
  </React.StrictMode>
);
