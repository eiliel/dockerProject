import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import NavBar from "../components/NavBar";
import "../NotHome.css";

function PlayMusic() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);

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

    // Fait un appel HTTP pour récupérer les artistes depuis l'API
    axios
      .get("http://localhost:3001/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des artistes :", error);
      });
  }, []);

  const playSelectedSong = (songId) => {
    // Trouve l'index de la chanson avec l'ID correspondant
    const songIndex = songs.findIndex((song) => {
      return song.id === songId;
    });
    console.log(songs);
    console.log(songIndex);

    // Commence la lecture de la chanson sélectionnée
    setCurrentSongIndex(songIndex);
    setIsPlaying(true);
  };

  const handleSongEnded = () => {
    console.log(songs.length);
    if (currentSongIndex < songs.length - 1) {
      // console.log(currentSongIndex);
      const nextIndex = shuffle ? getRandomIndex() : currentSongIndex + 1;
      setCurrentSongIndex(nextIndex);
    } else {
      // Arrête la lecture si toutes les chansons ont été jouées
      setIsPlaying(false);
    }
  };

  const handleToggleShuffle = () => {
    // Active/désactive le mode aléatoire
    setShuffle((prevShuffle) => !prevShuffle);
  };

  const getRandomIndex = () => {
    // Retourne un indice aléatoire différent de l'indice actuel
    let randomIndex = currentSongIndex;
    while (randomIndex === currentSongIndex) {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    return randomIndex;
  };

  return (
    <>
      <NavBar />
      <div className="middleNotHome">
        {artists.map((artist) => (
          <div key={artist.id}>
            <h2>{artist.name}</h2>
            {songs
              .filter((song) => song.artist_id === artist.id)
              .map((song) => (
                <div key={song.id}>
                  {song.id}
                  {song.audio_url}
                  <span>{song.title}</span>
                  <button onClick={() => playSelectedSong(song.id)}>
                    Play
                  </button>
                </div>
              ))}
          </div>
        ))}

        {currentSongIndex!=0 && 
        <>
        <div className="playerContainer">
          <button onClick={handleToggleShuffle}>
            {shuffle ? "Shuffle On" : "Shuffle Off"}
          </button>
          {songs.length > 0 && (
            <ReactPlayer
              url={songs[currentSongIndex].audio_url}
              playing={isPlaying}
              controls={true}
              width="90%"
              height="70px"
              onEnded={handleSongEnded}
            />
          )}
        </div></>}
      </div>
    </>
  );
}

export default PlayMusic;
