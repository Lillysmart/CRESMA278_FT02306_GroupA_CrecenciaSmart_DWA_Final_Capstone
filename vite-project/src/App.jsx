import React from "react";
import { Routes, Route } from "react-router-dom";
import { ShowPreview } from "./Components/Preview";
//import { ShowDetail } from "./Components/ShowDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowPreview/>} />
        
      </Routes>
    </div>
  );
};

export default App;
