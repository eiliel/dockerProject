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
  const [openArtists, setOpenArtists] = useState([]);
  const [playedSongs, setPlayedSongs] = useState([]);

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
        const initialOpenArtists = {};
        response.data.forEach((artist) => {
          // Initialise chaque clé avec l'ID de l'artiste et la valeur à false
          initialOpenArtists[artist.id] = false;
        });
        setOpenArtists(initialOpenArtists);
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des artistes :", error);
      });
  }, []);

  const playSelectedSong = (songId) => {
    // Ajoute la chanson actuelle à l'historique
    setPlayedSongs((prevPlayedSongs) => [...prevPlayedSongs, currentSongIndex]);

    // Trouve l'index de la chanson avec l'ID correspondant
    const songIndex = songs.findIndex((song) => {
      return song.id === songId;
    });

    // Commence la lecture de la chanson sélectionnée
    setCurrentSongIndex(songIndex);
    setIsPlaying(true);
  };

  const handleSongEnded = () => {
    console.log(songs.length);
    if (currentSongIndex < songs.length - 1 || shuffle) {
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
    // Réinitialise l'historique des chansons jouées lorsque le mode shuffle est activé/désactivé
    setPlayedSongs([]);
  };

  const getRandomIndex = () => {
    // Retourne un indice aléatoire différent de l'indice actuel et de l'historique des chansons jouées
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (playedSongs.includes(randomIndex));
    return randomIndex;
  };

  const toggleArtistBox = (artistId) => {
    setOpenArtists((prevOpenArtists) => {
      const newOpenArtists = { ...prevOpenArtists };
      newOpenArtists[artistId] = !newOpenArtists[artistId];
      return newOpenArtists;
    });
  };

  const handlePrevious = () => {
    if (shuffle) {
      // Si en mode Shuffle, récupérez la dernière chanson jouée dans l'historique
      const lastPlayedIndex = playedSongs.length > 0 ? playedSongs.pop() : 0;
      setCurrentSongIndex(lastPlayedIndex);
    } else {
      const prevIndex =
        currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
      setCurrentSongIndex(prevIndex);
    }
  };

  const handleNext = () => {
    if (shuffle) {
      const nextIndex = getRandomIndex();
      setCurrentSongIndex(nextIndex);
    } else {
      const nextIndex =
        currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
      setCurrentSongIndex(nextIndex);
    }
  };

  return (
    <>
      <NavBar />
      <div className="middleNotHome">
        {artists.map((artist) => (
          <div key={artist.id}>
            {songs.some((song) => song.artist_id === artist.id) && (
              <h2
                className="artistTitle"
                onClick={() => toggleArtistBox(artist.id)}
              >
                {artist.name}
                {openArtists[artist.id] ? (
                  <span
                    className="material-symbols-outlined"
                    style={{ verticalAlign: "middle" }}
                  >
                    expand_less
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    style={{ verticalAlign: "middle" }}
                  >
                    expand_more
                  </span>
                )}
                {}
              </h2>
            )}
            {openArtists[artist.id] && (
              <div className="songList">
                {songs
                  .filter((song) => song.artist_id === artist.id)
                  .map((song) => (
                    <span
                      key={song.id}
                      onClick={() => playSelectedSong(song.id)}
                    >
                      <div
                        className={`songs ${
                          currentSongIndex === song.id - 1
                            ? "selectedSong fade-transition"
                            : ""
                        }`}
                        id={
                          currentSongIndex === song.id - 1 && isPlaying
                            ? "selectedSong"
                            : ""
                        }
                      >
                        {song.title}
                      </div>
                    </span>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {isPlaying && (
        <>
          <div className="playerContainer">
            <button onClick={handlePrevious}>
              <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <div className="currentlyPlaying">
              {currentSongIndex !== null && (
                <>
                  {songs[currentSongIndex].title} -{" "}
                  {
                    artists.find(
                      (artist) =>
                        artist.id === songs[currentSongIndex].artist_id
                    ).name
                  }
                </>
              )}
            </div>
            <button onClick={handleNext}>
              <span className="material-symbols-outlined">skip_next</span>
            </button>
            <button onClick={handleToggleShuffle}>
              {shuffle ? (
                <span className="material-symbols-outlined">shuffle_on</span>
              ) : (
                <span className="material-symbols-outlined">shuffle</span>
              )}
            </button>

            {songs.length > 0 && (
              <div className="reactPlayer">
                <ReactPlayer
                  url={songs[currentSongIndex].audio_url}
                  playing={isPlaying}
                  controls={true}
                  width="75%"
                  height="70px"
                  onEnded={handleSongEnded}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PlayMusic;
