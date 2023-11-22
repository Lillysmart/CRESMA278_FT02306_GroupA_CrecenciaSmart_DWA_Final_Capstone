// Favourites.js
import React, { useEffect } from 'react';
import { useFavorites } from './useFavourite'; // Adjust the path


export const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    console.log('Favorites updated:', favorites);
  }, [favorites]);

  const handleRemoveFromFavorites = (episodeId) => {
    console.log('Removing from favorites:', episodeId);
    removeFromFavorites(episodeId);
  };

  console.log('Rendering Favourites component. Current favorites:', favorites);

  return (
    <div>
      {/* ... Rest of the component remains unchanged ... */}
    </div>
  );
};

export default Favourites;