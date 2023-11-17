import React, { useState, useEffect } from "react";

export const Header = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/id/10716")
      .then((response) => {
        return response.json();
      })
      .then((responseData)=>{
        console.log("Fetched data:", responseData);
        setData(responseData)
      })

  }, []);


 

  return (
    <div>
      <h1> {data}</h1>
    </div>
  );
};
