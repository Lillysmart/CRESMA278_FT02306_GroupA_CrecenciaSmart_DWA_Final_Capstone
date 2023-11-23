import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';
import { useFavoritesContext } from './FavoritesContext'; // Assuming you have a context for favorites

export const ShowPreview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites } = useFavoritesContext(); // Assuming you have a context for favorites
  const navigate = useNavigate(); // Hook to navigate between pages

  // Genre mapping
  const genreMap = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Fetched data:", responseData);
        setData(responseData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error("Fetch error:", fetchError);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const showData = data || [];

  // Configure Fuse.js for searching titles
  const fuse = new Fuse(showData, { keys: ['title'] });
  const searchResults = searchTerm ? fuse.search(searchTerm) : showData;

  const handleShowClick = (showId) => {
    navigate(`/id/${showId}`);
  };

  const handleFavoriteClick = () => {
    // Navigate to the favorites page
    navigate("/favourites");
  };

  return (
    <>
      <div className="show-preview-container">
        <div className="top-buttons">
          <label>Sort By:</label>
          <input className="Search-button" type="search" placeholder=""></input>
          <label>Title:</label>
          <input
            className="title-button"
            type="search"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label>Genre:</label>
          <input className="title-button" type="search" placeholder="Search by genre..." />
          <button className="favourite-button" onClick={handleFavoriteClick}>
            View Favorites
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div>
          {searchResults.map((show, showIndex) => (
            <div
              key={showIndex}
              className="show-preview-card"
              onClick={() => handleShowClick(show.id)}
            >
              <h2>{show.title}</h2>
              <img src={show.image} alt={`Show ${showIndex + 1}`} />
              <p>{show.description}</p>
              <h3>Seasons: {show.seasons} </h3>
              <p>Updated: {new Date(show.updated).toLocaleDateString("en-UK")}</p>
              <p className="showgenre">Genre: {show.genres ? show.genres.map(id => genreMap[id]).join(", ") : 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
