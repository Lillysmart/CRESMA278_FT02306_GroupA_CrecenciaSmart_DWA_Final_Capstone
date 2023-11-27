
import React, {useContext, createContext,  useState } from "react";


// Create a context for managing favorites
const FavoritesContext = createContext();

export const useFavoritesContext = () => {
 const context = useContext(FavoritesContext);
  if (!context) {
   throw Error('Please make sure to use the useFavoritesContext function within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (episode, show, season) => {
    setFavorites([...favorites, { episode, show, season }]);
  };

  const removeFromFavorites = (episodeNumber) => {
    setFavorites((previousFavorites) =>
     previousFavorites.filter((favorite) => favorite.episode.episode !== episodeNumber)
    );
   }
  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
