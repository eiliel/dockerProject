import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className='navbar'>
      <Link to="/">
        <button className="navButton">Home</button>
      </Link>
      <Link to="/addArtist">
        <button className="navButton">Add Artist</button>
      </Link>
      <Link to="/addSong">
        <button className="navButton">Add Song</button>
      </Link>
      <Link to="/playMusic">
        <button className="navButton">Play Songs</button>
      </Link>
    </div>
  );
}

export default NavBar;
