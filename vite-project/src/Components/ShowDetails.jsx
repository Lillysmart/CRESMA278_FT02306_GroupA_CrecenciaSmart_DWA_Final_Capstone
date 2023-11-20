// ShowDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ShowDetail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate between pages

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
    // Navigate back to the preview page
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
          {showDetails.seasons.map((season, index) => (
            <div key={index} className="season-container">
              <h3 className="season-title">{season.title}</h3>
              <p className="episode-count">Number of Episodes: {season.episodes.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
