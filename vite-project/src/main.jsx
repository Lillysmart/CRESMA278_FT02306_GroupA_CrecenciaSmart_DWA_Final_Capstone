// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from './Components/FavoritesContext';  // Adjust the path as needed

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

