// EpisodePreview.jsx
import React from "react";

const EpisodePreview = ({ episodes }) => {
  return (
    <div className="episode-preview-container">
      <h2>Episode Preview</h2>
      {episodes.map((episode, index) => (
        <div key={index} className="episode-preview-card">
          <h3>{episode.title}</h3>
          <p>{episode.description}</p>
          {/* Additional information from nested structure */}
          {episode.seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="season-container">
              <h4>Season {season.number}</h4>
              {season.episodes.map((episode, episodeIndex) => (
                <div key={episodeIndex} className="episode-container">
                  <p>{episode.title}</p>
             
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EpisodePreview;
