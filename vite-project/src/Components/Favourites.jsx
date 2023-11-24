// Favourites.jsx
import React from "react";
import { useFavoritesContext } from "./FavoritesContext";

const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavoritesContext();

  const handleRemoveFromFavorites = (episodeId) => {
    removeFromFavorites(episodeId);
  };
  const date = new Date();
  const todayDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/ ${date.getFullYear()}`;

  return (
    <div>
      <h1>Your Favorites :</h1>
      {favorites.length > 0 ? (
        <ul className="favourite-list">
          {favorites.map(({ episode, show, season }) => (
            <li key={episode.episode}>
              <div className="favourite-shows">
                <h3>{`${show}`}</h3>
                <h4>{`Season: ${season} `}</h4>
                <p>{`Episode ${episode.episode}: ${episode.title.slice(0, 25)}${
                  episode.title.length > 25? "..." : ""
                }`}</p>
                  <div className="audio-container">
                  <audio controls style={{ maxWidth: '100%' }}>
                    <source src={episode.file} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <br />
                <p>Date Added:{todayDate}</p>
                <button
                  onClick={() => handleRemoveFromFavorites(episode.episode)}
                >
                  Remove from Favorites
                </button>
              </div>
              <div></div>
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
