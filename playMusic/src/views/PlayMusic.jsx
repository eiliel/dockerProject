import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import NavBar from "../components/NavBar";
import "../NotHome.css";

function PlayMusic() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fait un appel HTTP pour récupérer les chansons depuis l'API
    axios
      .get("http://localhost:3001/songs")
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des chansons :", error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <h2>Songs</h2>
      <div className="middleNotHome">
        <ul>
          {songs.map((song) => (
            <li className="liSong" key={song.id}>
              {song.title} - {song.artist_name}
              <ReactPlayer
                url={song.audio_url.replace(/ /g, "_")}
                controls={true}
                width="90%"
                height="70px" 
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PlayMusic;
