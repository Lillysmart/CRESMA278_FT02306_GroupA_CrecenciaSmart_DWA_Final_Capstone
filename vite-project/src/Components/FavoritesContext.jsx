// FavoritesContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (episode, show, season) => {
    setFavorites([...favorites, { episode, show, season }]);
  };

  const removeFromFavorites = (episodeNumber) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.episode.episode !== episodeNumber)
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
