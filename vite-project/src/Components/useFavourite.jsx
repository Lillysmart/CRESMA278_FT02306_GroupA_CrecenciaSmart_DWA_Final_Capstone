import {useState} from "react"


export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
  
    const addToFavorites = (episode, show) => {
      setFavorites([...favorites, { episode, show }]);
    };
  
    const removeFromFavorites = (episodeToRemove) => {
      const updatedFavorites = favorites.filter((fav) => !isSameEpisode(fav.episode, episodeToRemove));
      setFavorites(updatedFavorites);
    };
  
    const isSameEpisode = (episode1, episode2) => {
      return episode1.title === episode2.title && episode1.episode === episode2.episode;
    };
  
    return { favorites, addToFavorites, removeFromFavorites };
  };
  