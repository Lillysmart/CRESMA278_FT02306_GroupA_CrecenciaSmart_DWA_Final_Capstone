
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import { useContext } from "react";
import { useFavoritesContext } from "./FavoritesContext";

export const ShowDetail = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const { addToFavorites, favorites, removeFromFavorites } =
    useFavoritesContext();
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [userPreferences, setUserPreferences] = useState({
      lastListenedShow: null,
      lastListenedEpisode: null,
      listenedAllTheWayThrough: [],
    });
    const audioRef = useRef(null);
  const navigate = useNavigate();

 

  useEffect(() => {
   
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
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
    navigate("/");
  };

  const handleSeasonSelect = (event) => {
    setSelectedSeason(event.target.value);
  };

  const isFavorite = (episodeNumber) => {
    return favorites.some((fav) => fav.episode.episode === episodeNumber);
  };

  const handleAddToFavorites = (episode) => {
    addToFavorites(episode, showDetails.title, selectedSeason);
  };

  const handleRemoveFromFavorites = (episodeNumber) => {
    removeFromFavorites(episodeNumber);
  };

  const handleFavouriteClick = () => {
    navigate("/favourites");
  };

  const shorterDescription = (description, maxSentences) => {
    const sentences = description.split(".").slice(0, maxSentences);
    const truncatedDescription =
      sentences.join(".") + (sentences.length < maxSentences ? "" : "...");
    return truncatedDescription;
  };

// Load user preferences on component mount
useEffect(() => {
  const storedUserPreferences = localStorage.getItem("userPreferences");
  if (storedUserPreferences) {
    setUserPreferences(JSON.parse(storedUserPreferences));
  }
}, []);

// Save user preferences to localStorage when they change
useEffect(() => {
  localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
}, [userPreferences]);


  // Prompt user before leaving the page if audio is playing
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (audioPlaying) {
        const confirmationMessage =
          alert('You have audio playing. Are you sure you want to leave? Your audio may stop.');
        event.returnValue = confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [audioPlaying]);

  // Update lastListenedEpisode when audio starts playing
  useEffect(() => {
    const handleAudioPlay = () => {
      const currentAudioRef = audioRef.current;
  
      // Add a check to ensure currentAudioRef is not null
      if (currentAudioRef) {
        const episodeNumber = currentAudioRef.dataset.episode || null;
        
        setUserPreferences((prevUserPreferences) => ({
          ...prevUserPreferences,
          lastListenedEpisode: episodeNumber,
        }));
      }
    };
  
    const currentAudioRef = audioRef.current;
  
    // Add a check to ensure currentAudioRef is not null before adding the event listener
    if (currentAudioRef) {
      currentAudioRef.addEventListener("play", handleAudioPlay);
    }
  
    return () => {
      // Use the variable currentAudioRef in the cleanup function
      if (currentAudioRef) {
        currentAudioRef.removeEventListener("play", handleAudioPlay);
      }
    };
  }, [audioRef]);
  
  

// Remember the last listened show, season, and episode
useEffect(() => {
  if (showDetails && selectedSeason) {
    const selectedSeasonDetails = showDetails.seasons.find(
      (season) => season.season.toString() === selectedSeason
    );

    if (selectedSeasonDetails) {
      setUserPreferences((prevUserPreferences) => {
        const lastListenedEpisode =
          prevUserPreferences.lastListenedShow === showDetails.title &&
          prevUserPreferences.lastListenedSeason === selectedSeason
            ? prevUserPreferences.lastListenedEpisode
            : null;

        // Only update if the selected show or season changes
        if (
          prevUserPreferences.lastListenedShow !== showDetails.title ||
          prevUserPreferences.lastListenedSeason !== selectedSeason ||
          prevUserPreferences.lastListenedEpisode !== lastListenedEpisode
        ) {
          const updatedUserPreferences = {
            ...prevUserPreferences,
            lastListenedShow: showDetails.title,
            lastListenedSeason: selectedSeason,
            lastListenedEpisode: lastListenedEpisode,
          };

          console.log(
            'Updated User Preferences:\n',
            `Last Listened Show: ${updatedUserPreferences.lastListenedShow}\n`,
            `Last Listened Season: ${updatedUserPreferences.lastListenedSeason}\n`,
            `Last Listened Episode: ${updatedUserPreferences.lastListenedEpisode}`
          );

          return updatedUserPreferences;
        }

        // If the selected show or season remains the same, no need to update
        return prevUserPreferences;
      });
    }
  }
}, [showDetails, selectedSeason]);


  // Remember timestamp when the user stops listening
useEffect(() => {
  const handleAudioPause = () => {
    if (audioPlaying) {
      setUserPreferences((prevUserPreferences) => ({
        ...prevUserPreferences,
        lastListenedTimestamp: audioProgress.toFixed(2),
      }));
    }
  };

  window.addEventListener("beforeunload", handleAudioPause);

  return () => {
    window.removeEventListener("beforeunload", handleAudioPause);
  };
}, [audioPlaying, audioProgress]);
  // Reset all user progress
  const handleResetProgress = () => {
    setUserPreferences((prevUserPreferences) => ({
      ...prevUserPreferences,
      lastListenedShow: null,
      lastListenedSeason: null,
      lastListenedEpisode: null,
      listenedAllTheWayThrough: [],
    }));
  };
  
  return (
    <>
      <div className="fixed-buttons">
        <button className="back-button" onClick={handleBackClick}>
          Back to Preview
        </button>
        <button className="reset-button" onClick={handleResetProgress}>
          Reset All Listening History
        </button>
        <button className="favourite-button" onClick={handleFavouriteClick}>
          Favourite
        </button>
      </div>
      <div className="show-container">
        {loading ? (
          <p>Loading...</p>
        ) : showDetails ? (
          <div className="show-card">
            <div className="show-top-info">
              <h1 className="show-title">{showDetails.title}</h1>
              <img
                className="show-image"
                src={showDetails.image}
                alt={showDetails.title}
              />
              <p className="show-description">
                {shorterDescription(showDetails.description, 2)}
              </p>
            </div>
            <div className="season-selection">
              <label htmlFor="seasonSelect" className="season-label">
                Season:
              </label>
              <select
                id="seasonSelect"
                onChange={handleSeasonSelect}
                value={selectedSeason || ""}
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
                {showDetails.seasons.map((season) => {
                  if (season.season.toString() === selectedSeason) {
                    return (
                      <div key={season.season} className="season-container">
                        <p>{`Number of Episodes: ${season.episodes.length}`}</p>

                        {season.episodes && season.episodes.length > 0 ? (
                          season.episodes.map((episode) => (
                            <div key={episode.episode} className="episode-card">
                              <h4>{`Episode ${episode.episode} : ${episode.title}`}</h4>
                              <p>{episode.description}</p>
                              <audio
                               ref={audioRef}
                    controls
                    onPlay={() => setAudioPlaying(true)}
                    onPause={() => setAudioPlaying(false)}
                    onTimeUpdate={(e) => setAudioProgress(e.target.currentTime)}
                  >
                    <source src={episode.file} type="audio/mp3" />
                    Audio not supported by your browser
                  </audio>
                  <p>Current Progress: {audioProgress.toFixed(2)} seconds</p>
                 
                              <br />
                              {isFavorite(episode.episode) ? (
                                <button
                                  className="remove-favourite-button"
                                  onClick={() =>
                                    handleRemoveFromFavorites(episode.episode)
                                  }
                                >
                                  Remove from Favorites
                                </button>
                              ) : (
                                <button
                                  className="add-favourite-button"
                                  onClick={() => handleAddToFavorites(episode)}
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
          <p>{error || "No show details available."}</p>
        )}
      </div>
    </>
  );
};

export default ShowDetail;

