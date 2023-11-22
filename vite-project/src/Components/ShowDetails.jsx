// ShowDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

 export const ShowDetail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching show details: ${response.status}`);
        }
        const responseData = await response.json();
        setShowDetails(responseData);
        setLoading(false); // Set loading to false when data is fetched
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        setError('Error fetching show details. Please try again later.');
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchShowDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSeasonSelect = (event) => {
    setSelectedSeason(event.target.value);
  };

  const isFavorite = (episodeNumber) => {
    console.log(`Checking if episode ${episodeNumber} is a favorite`);
    return favorites.some((fav) => fav.episode.episode === episodeNumber);
  };
  const handleAddToFavourite = (episode) => {
    console.log('Adding to favorites:', episode);
    console.log('Is it already a favorite?', isFavorite(episode));
  
    setFavorites((prevFavorites) => {
      if (!isFavorite(episode)) {
        const newFavorites = [...prevFavorites, { episode, show: showDetails.title }];
        console.log('New favorites:', newFavorites);
        return newFavorites;
      }
      return prevFavorites;
    });
  };
  

  const handleRemoveFromFavorites = (episodeId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.episode.id !== episodeId));
  };

  const handleFavouriteClick = () => {
    navigate('/favourites');
  };

  return (
    <>
      <div className="fixed-buttons">
        <button className="back-button" onClick={handleBackClick}>
          Back to Preview
        </button>
        <input className="hello-button" type="search" />
        <button className="favourite-button" onClick={handleFavouriteClick}>
          Favourite
        </button>
      </div>
      <div className="show-container">
        {loading ? ( // Display loading message while data is being fetched
          <p>Loading...</p>
        ) : showDetails ? ( // Display show details if available
          <div className="show-card">
            <div className="show-top-info">
              <h1 className="show-title">{showDetails.title}</h1>
              <img className="show-image" src={showDetails.image} alt={showDetails.title} />
              <p className="show-description">{showDetails.description}</p>
            </div>
            <div className="season-selection">
              <label htmlFor="seasonSelect" className="season-label">
                Season:
              </label>
              <select
                id="seasonSelect"
                onChange={handleSeasonSelect}
                value={selectedSeason || ''}
                className="season-select"
              >
                <option value="" disabled>
                  Select a season
                </option>
                {showDetails.seasons.map((season) => (
                  <option key={season.season} value={season.season}>
                    {season.season}
                  </option>
                ))}
              </select>
            </div>
            {selectedSeason && (
              <div className="selected-season-info">
                <h2>{`Season ${selectedSeason}`}</h2>
                {showDetails.seasons.map((season) => {
                  if (season.season.toString() === selectedSeason) {
                    return (
                      <div key={season.season} className="season-container">
                        {season.episodes && season.episodes.length > 0 ? (
                          season.episodes.map((episode) => (
                            <div key={episode.episode} className="episode-card">
                              <h4>{`Episode ${episode.episode} : ${episode.title}`}</h4>
                              <p>{episode.description}</p>
                              <audio controls>
                                <source src={episode.file} type="audio/mp3" />
                                Your browser does not support the audio element.
                              </audio>
                              <br />
                              {isFavorite(episode.id) ? (
                                <button
                                  className="remove-favourite-button"
                                  onClick={() => handleRemoveFromFavorites(episode.id)}
                                >
                                  Remove from Favorites
                                </button>
                              ) : (
                                <button
                                className="add-favourite-button"
                                onClick={() => handleAddToFavourite(episode)}
                              >
                                Add to Favorites
                              </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No episodes available for this season.</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        ) : (
          <p>{error || 'No show details available.'}</p>
        )}
      </div>
    </>
  );
};

export default ShowDetail;
