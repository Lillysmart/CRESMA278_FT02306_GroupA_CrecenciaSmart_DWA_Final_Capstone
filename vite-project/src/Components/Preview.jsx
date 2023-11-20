import React, { useState, useEffect } from "react";

export const ShowPreview = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Fetched data:", responseData);
        setData(responseData);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error("Fetch error:", fetchError);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleNewData = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Fetched data:", responseData);
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {}, []);

  // Check if data is present
  const showData = data || [];
  const genresMap = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  return (
    <div className="show-preview-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {showData.length > 0 && (
        <div>
          <h1>The Inclusive Prodcast</h1>

          {showData.map((show, showIndex) => (
            <div
              key={showIndex}
              className="show-preview-card"
              onClick={handleNewData}
            >
              <h2>{show.title}</h2>
              <img src={show.image} alt={`Show ${showIndex + 1}`} />
              <div className="show-preview-details">
                <p>{show.description}</p>
                <h3>Seasons :{show.seasons} </h3>
                {/* Assuming show.updated is a valid Date object */}
                <p>
                  Updated:{" "}
                  {new Date(show.updated).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {show.genres && show.genres.length > 0 && (
                  <p className="showgenre">
                    Genre:{" "}
                    {show.genres
                      .map((genreId) => {
                        const mappedGenre = genresMap[genreId.toString()];
                        console.log(
                          "Genre ID:",
                          genreId,
                          typeof genreId,
                          "Mapped Genre:",
                          mappedGenre
                        );
                        return mappedGenre;
                      })
                      .join(", ")}
                  </p>
                )}

                <p className="showid"> Id :{show.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
