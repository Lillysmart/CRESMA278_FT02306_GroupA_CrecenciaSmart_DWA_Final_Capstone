import React, { useContext, createContext, useState } from "react";

//Create a context for managing favorites
const FavoritesContext = createContext();

//Custom hook to use the favorites context
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    // Ensure that the hook is used within a FavoritesProvider
    throw Error(
      'Please make sure to use the useFavoritesContext function within a FavoritesProvider'
    );
  }
  return context;
};

//the provider component that will be exported
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // a functions to manipulate the state
  const addToFavorites = (episode, show, season) => {
    setFavorites([...favorites, { episode, show, season }]);
  };

  const removeFromFavorites = (episodeNumber) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (favorite) => favorite.episode.episode !== episodeNumber
      )
    );
  };

  //The context value to the components
  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    // Step 7: Use the context provider to wrap components that need access
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
