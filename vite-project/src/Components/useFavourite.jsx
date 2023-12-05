import {useState} from "react"

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
  
    const addToFavorites = (episode, show) => {
      setFavorites([...favorites, { episode, show }]);
    };
  
    const removeFromFavorites = (episodeNumber) => {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.episode.episode !== episodeNumber)
        );
      };
      
    return { favorites, addToFavorites, removeFromFavorites };
  };
  