// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { ShowPreview } from './Components/Preview';
import { ShowDetail } from './Components/ShowDetails';
import Favourites from './Components/Favourites'; // Import Favourites without curly braces
import { useFavorites } from './Components/useFavourite';
import { FavoritesProvider } from './Components/FavoritesContext';

const App = () => {

  return (
    
      
      <Routes>
        <Route path="/" element={<ShowPreview />} />
        <Route path="/id/:id" element={<ShowDetail />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    
   
  );
};

export default App;
