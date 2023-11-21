// EpisodePreview.jsx
import React from "react";

const EpisodePreview = ({ episodes }) => {
  if (episodes === undefined || episodes === null) {
    console.error("Invalid 'episodes' prop. Expected an array, but got:", episodes);
    return null; // or handle the error in another way
  }

  if (!Array.isArray(episodes)) {
    console.error("Invalid 'episodes' prop. Expected an array, but got:", typeof episodes, episodes);
    return null; // or handle the error in another way
  }

  return (
    <div className="episode-preview-container">
      <h2>Episode Preview</h2>
      {episodes.map((episode, index) => (
        <div key={index} className="episode-preview-card">
          <h3>{episode.title}</h3>
          <p>{episode.description}</p>
          {/* Additional information from nested structure */}
          {Array.isArray(episode.seasons) &&
            episode.seasons.map((season, seasonIndex) => (
              <div key={seasonIndex} className="season-container">
                <h4>Season {season.number}</h4>
                {Array.isArray(season.episodes) &&
                  season.episodes.map((episode, episodeIndex) => (
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
