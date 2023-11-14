import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RequestProvider } from 'react-request-hook';
import axios from 'axios';
import ThemeContextWrapper from './themeContextWrapper';

// Configure axios to work with the API backend
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

// Root of the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// StrictMode enables additional checks and warnings for its descendants
root.render(
  <React.StrictMode>
    <RequestProvider value={axiosInstance}>
      <ThemeContextWrapper>
        <App />
      </ThemeContextWrapper>
    </RequestProvider>
  </React.StrictMode>
);

// Tool for measuring performance and logging the results
reportWebVitals(console.log);
