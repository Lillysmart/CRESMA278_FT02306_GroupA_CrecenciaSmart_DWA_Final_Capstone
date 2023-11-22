import React from "react";
import { Routes, Route } from "react-router-dom";
import { ShowPreview } from "./Components/Preview";
import { ShowDetail } from "./Components/ShowDetails";
import {Favourite} from "./Components/Favourite"




const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowPreview />} />
        <Route path="/id/:id" element={<ShowDetail />} />\
        <Route path ="/favourite" element={<Favourite/>} />
      </Routes>
    </div>
  );
};

export default App;
