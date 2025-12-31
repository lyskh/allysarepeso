import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Get the basename from PUBLIC_URL (set by Create React App based on homepage in package.json)
// PUBLIC_URL will be the pathname part of the homepage URL (e.g., "/my-portfolio" or "")
const basename = process.env.PUBLIC_URL || '';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

