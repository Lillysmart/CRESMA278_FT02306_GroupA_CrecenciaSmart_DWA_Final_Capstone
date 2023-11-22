// Favourites.js
import React from 'react';
import { useFavoritesContext } from './FavoritesContext';

const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavoritesContext();

  const handleRemoveFromFavorites = (episodeId) => {
    removeFromFavorites(episodeId);
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(({ episode, show, season }) => (
            <li key={episode.id}>
              <div>
                <strong>{`Show: ${show}, Season ${season}, Episode ${episode.episode}: ${episode.title}`}</strong>
                <p>{episode.description}</p>
              </div>
              <div>
                <button onClick={() => handleRemoveFromFavorites(episode.id)}>
                  Remove from Favorites
                </button>
              </div>
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
