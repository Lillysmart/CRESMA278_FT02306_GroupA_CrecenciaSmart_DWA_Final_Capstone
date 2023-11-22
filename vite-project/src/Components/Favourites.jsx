import React, { useState } from 'react';

export  const Favourites = ({ location }) => {
  const [error, setError] = useState(null);
  const favorites = location.state?.favorites || [];

  // Error boundary
  const handleError = (error) => {
    console.error('Error in Favourites component:', error);
    setError('An error occurred. Please try again.');
  };

  return (
    <div>
      <h1>Your Favorites</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((episode, index) => (
                <li key={index}>
                  <strong>{`Episode ${episode.episode}: ${episode.title}`}</strong>
                  <p>{episode.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorites yet. Add some from the episodes!</p>
          )}
        </>
      )}
    </div>
  );
};


