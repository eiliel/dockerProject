import React from "react";
import "../App.css";
import HomeButtons from "../components/HomeButtons";

function Home() {
  return (
    <div className="middle">
      <h1>Play Music</h1>
      <h3>Your personalized playlist</h3>
      <HomeButtons />
    </div>
  );
}

export default Home;
