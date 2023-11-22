
import { useState } from 'react';

// useFavorites.js
export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
  
    const addToFavorites = (episode, show) => {
      setFavorites([...favorites, { episode, show }]);
    };
  
    const removeFromFavorites = (episodeId) => {
      const updatedFavorites = favorites.filter((fav) => fav.episode.id !== episodeId);
      setFavorites(updatedFavorites);
    };
  
    return { favorites, addToFavorites, removeFromFavorites };
  };
  