// Favourites.js
import React from 'react';
import { useFavorites } from './useFavourite' // Adjust the path

 export const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleRemoveFromFavorites = (episodeId) => {
    removeFromFavorites(episodeId);
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((episode) => (
            <li key={episode.id}>
              <strong>{`Episode ${episode.episode}: ${episode.title}`}</strong>
              <p>{episode.description}</p>
              <button onClick={() => handleRemoveFromFavorites(episode.id)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet. Add some from the episodes!</p>
      )}
    </div>
  );
};

export default Favourites;
