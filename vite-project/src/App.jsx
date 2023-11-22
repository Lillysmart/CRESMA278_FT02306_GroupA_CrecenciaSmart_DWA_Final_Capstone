// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ShowPreview } from './Components/Preview';
import { ShowDetail } from './Components/ShowDetails';
import Favourites from './Components/Favourites'; // Import Favourites without curly braces
import { useFavorites } from './Components/useFavourite';

const App = () => {
  const favoritesProps = useFavorites();

  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowPreview />} />
        <Route path="/id/:id" element={<ShowDetail {...favoritesProps} />} />
        <Route path="/favourites" element={<Favourites {...favoritesProps} />} />
      </Routes>
    </div>
  );
};

export default App;
