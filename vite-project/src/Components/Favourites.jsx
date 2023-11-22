// Favourites.js
import React from 'react';
import { useFavoritesContext } from './FavoritesContext';

export const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavoritesContext();
  console.log('Rendering Favourites component. Current favorites:', favorites);

  const handleRemoveFromFavorites = (episodeId) => {
    removeFromFavorites(episodeId);
  };

  return (
    <div>
      <h1>Your Favorites:</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(({ episode, show }) => (
            <li key={episode.episode} className="favorite-item">
              <div>
                <strong>{`Show: ${show}, Episode ${episode.episode}: ${episode.title}`}</strong>
                <p>{episode.description}</p>
              </div>
              <div>
                <button onClick={() => handleRemoveFromFavorites(episode.episode)}>
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