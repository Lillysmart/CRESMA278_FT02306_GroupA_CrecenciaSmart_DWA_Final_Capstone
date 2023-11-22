import React from "react";
import { Routes, Route } from "react-router-dom";
import { ShowPreview } from "./Components/Preview";
import { ShowDetail } from "./Components/ShowDetails";
import { Favourites } from "./Components/Favourites";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowPreview />} />
        <Route path="/id/:id" element={<ShowDetail />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
};

export default App;
