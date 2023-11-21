
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ... (import statements)
// ... (import statements)

export const ShowDetail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null); // New state for selected season
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
        setLoading(false);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        setError("Error fetching show details. Please try again later.");
        setLoading(false);
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

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="show-container">
      {showDetails && (
        <div className="show-card">
          <button className="back-button" onClick={handleBackClick}>
            Back to Preview
          </button>
          <h1 className="show-title">{showDetails.title}</h1>
          <img className="show-image" src={showDetails.image} alt={showDetails.title} />
          <p className="show-description">{showDetails.description}</p>
          <p className="show-seasons">
            Season:
            <select onChange={handleSeasonSelect} value={selectedSeason || ''}>
              <option value="" disabled>Select a season</option>
              {showDetails.seasons.map((season) => (
                <option key={season.season} value={season.season}>
                  {season.season}
                </option>
              ))}
            </select>
          </p>

          {/* Display selected season information */}
          {selectedSeason && (
            <div className="selected-season-info">
              <h2>{`Season ${selectedSeason}`}</h2>
              {showDetails.seasons.map((season) => {
                if (season.season.toString() === selectedSeason) {
                  return (
                    <div key={season.season} className="season-container">
                      <h3>{season.title}</h3>
                      {season.episodes && season.episodes.length > 0 ? (
                        season.episodes.map((episode) => (
                          <div key={episode.episode} className="episode-card">
                            <h4>Episode {episode.episode} : {episode.title}</h4>
                            <p>{episode.description}</p>
                            <audio controls>
                              <source src={episode.file} type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
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
      )}
    </div>
  );
};
