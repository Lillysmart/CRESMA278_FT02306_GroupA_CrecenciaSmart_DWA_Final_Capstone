// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from './Components/FavoritesContext'; //get the provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </Router>
  </React.StrictMode>,
);

