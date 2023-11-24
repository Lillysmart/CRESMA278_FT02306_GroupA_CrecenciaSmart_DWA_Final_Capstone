import React, { useState } from "react";
import { useFavoritesContext } from "./FavoritesContext";
import { useNavigate } from "react-router-dom";
import { ShowDetail } from "./ShowDetails";

const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const [sortOption, setSortOption] = useState("all");

  const handleRemoveFromFavorites = (episodeId) => {
    removeFromFavorites(episodeId);
  };

  const date = new Date();
  const todayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const navigate = useNavigate();

  const backbuttonHandler = () => {
    navigate("/");
  };

  const sortedData = [...favorites].sort((a, b) => {
    switch (sortOption) {
      case "titleAsc":
        return a.show.localeCompare(b.show) || a.episode.title.localeCompare(b.episode.title);
      case "titleDesc":
        return b.show.localeCompare(a.show) || b.episode.title.localeCompare(a.episode.title);
      case "dateAsc":
        return new Date(a.todayDate) - new Date(b.todayDate);
      case "dateDesc":
        return new Date(b.todayDate) - new Date(a.todayDate);
      default:
        return 0;
    }
  });
  
  
  const handleFavouriteSelect = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <div>
        <button className="back-button" onClick={backbuttonHandler}>
          Home
        </button>
        <label htmlFor="favouriteSelect" className="favourite-label">
          Sort By:{" "}
        </label>

        <select
          id="favouriteSelect"
          onChange={handleFavouriteSelect}
          value={sortOption}
          className="season-select"
        >
          <option value="all">All</option>
          <option value="titleAsc">Title A-Z</option>
          <option value="titleDesc">Title Z-A</option>
          <option value="dateAsc">Oldest</option>
          <option value="dateDesc">Latest</option>
        </select>
      </div>
      <h1 className="favourite-heading">Your Favorites :</h1>
      {sortedData.length > 0 ? (
        <ul className="favourite-list">
          {sortedData.map(({ episode, show, season }) => (
            <li key={episode.episode}>
              <div className="favourite-shows">
                <h3>{`${show}`}</h3>
                <h4>{`Season: ${season} `}</h4>
                <p>{`Episode ${episode.episode}: ${episode.title.slice(0, 25)}${
                  episode.title.length > 25 ? "..." : ""
                }`}</p>
                <div className="audio-container">
                  <audio controls style={{ maxWidth: "100%" }}>
                    <source src={episode.file} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <br />
                <p>Date Added: {todayDate}</p>
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
