
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ... (import statements)

export const ShowDetail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          <p className="show-description">Description: {showDetails.description}</p>
          <p className="show-seasons">Seasons: {showDetails.seasons.length}</p>

          {/* Episodes Section */}
          <div className="episodes-section">
            <h2>Episodes</h2>
            {showDetails.episodes && showDetails.episodes.length > 0 ? (
              showDetails.episodes.map((episode) => (
                <div key={episode.episode} className="episode-card">
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                  <audio controls>
                    <source src={episode.file} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))
            ) : (
              <p>No episodes available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
