
import { useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (episode) => {
    setFavorites([...favorites, episode]);
  };

  const removeFromFavorites = (episodeId) => {
    const updatedFavorites = favorites.filter((episode) => episode.id !== episodeId);
    setFavorites(updatedFavorites);
  };

  return { favorites, addToFavorites, removeFromFavorites };
};
