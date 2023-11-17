import React, { useState, useEffect } from "react";

export const Header = () => {
  useEffect(() => {
    fetch("https://podcast-api.netlify.app/id/10716")
      .then((response) => {
        return response.json();
      })
      .then(console.log("Hi"));
  }, []);

  return (
    <div>
      <h1> Hello there</h1>
    </div>
  );
};
