import React, { useState } from "react";
import { useFavoritesContext } from "./FavoritesContext";
import { useNavigate } from "react-router-dom";
import { ShowDetail } from "./ShowDetails";

const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavoritesContext();
  const [filterOption, setfilterOption] = useState("all");
  const handleRemoveFavourite = (episodeId) => {
    removeFromFavorites(episodeId);
  };

  const date = new Date();
  const todayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const navigate = useNavigate();

  const backbuttonHandler = () => {
    navigate("/");
  };

  const sortedFavourites = [...favorites].sort((itemA, itemB) => {
    switch (filterOption) {
     
      case "titleAscending":
        return itemA.show.localeCompare(itemB.show) || itemA.episode.title.localeCompare(itemB.episode.title);
      case "titleDescending":
        return itemA.show.localeCompare(itemA.show) || itemB.episode.title.localeCompare(itemA.episode.title);
      case "dateAscending":
        return new Date(itemA.todayDate) - new Date(itemB.todayDate);
      case "dateDescending":
        return new Date(itemB.todayDate) - new Date(itemA.todayDate);
        
      default:
        return 0;
    }
  });
  
  
  const handleFavouriteSelect = (event) => {
    setfilterOption(event.target.value);
  };

  return (
    <div>
      <nav className="navbar">
        <button className="back-button" onClick={backbuttonHandler}>
          Home
        </button>
        <label htmlFor="favouriteSelect" className="favourite-label">
    
        </label>

        <select
          id="favouriteSelect"
          onChange={handleFavouriteSelect}
          value={filterOption}
          className="season-select"
        >
          <option value="all">All</option>
          <option value="titleAscending">Title A-Z</option>
          <option value="titleDescending">Title Z-A</option>
          <option value="dateAscending">Oldest</option>
          <option value="dateDescending">Latest</option>
        </select>
      </nav>
      <h1 className="favourite-heading">Your Favorites Episodes:</h1>
      {sortedFavourites.length > 0 ? (
        <ul className="favourite-list">
          {sortedFavourites.map(({ episode, show, season }) => (
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
                    Audio not supported by your browser.
                  </audio>
                </div>
                <br />
                <p>Date Added: {todayDate}</p>
                <button
                  onClick={() => handleRemoveFavourite(episode.episode)}
                >
                  Remove from Favorites
                </button>
              </div>
              <div></div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet. Add some from the episodes!</p>
      )}
    </div>
  );
};

export default Favourites;
