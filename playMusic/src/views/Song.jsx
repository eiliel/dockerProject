import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

export default function Song() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [errorUpload, setErrorUpload] = useState(null);
  const [songAdded, setSongAdded] = useState(false);

  //Read the artists names on the api
  useEffect(() => {
    axios
      .get("http://localhost:3001/artists")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des artistes :", error);
        setErrorUpload(error.response.data.error);
      });
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const okTitle = title.replace(/ /g, "_").replace(/[.',"?]/g, "");
    const path = `http://localhost:3001/uploads/${okTitle}_${selectedArtist}.mp3`;
    formData.append("title", title);
    formData.append("artistId", selectedArtist);
    formData.append("audioFile", e.target.audioFile.files[0]);
    formData.append("audioUrl", path);

    axios
      .post("http://localhost:3001/audios", formData)
      .then((response) => {
        setSelectedArtist("");
        setTitle("");
        setAudioFile(null);
        setSongAdded(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'upload :", error);
        setErrorUpload(error.response.data.error);
      });
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <>
      <NavBar />
      <h2>Add a song</h2>
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        <label htmlFor="artistSelect">Choose an artist </label>
        <select
          name="artistsList"
          id="artistSelect"
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
        >
          <option value="">-- Please choose an artist --</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>

        {selectedArtist && (
          <>
            <label htmlFor="songTitle">Enter song title </label>
            <input
              type="text"
              name="songTitle"
              id="songTitle"
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        )}

        {title && (
          <div className="spaceDiv">
            <label htmlFor="audioFile" className="fileButton">
              {audioFile ? (
                <>
                  {audioFile.name}{" "}
                  <span
                    className="material-symbols-outlined"
                    style={{ verticalAlign: "middle" }}
                  >
                    publish
                  </span>
                </>
              ) : (
                <>
                  Choose File{" "}
                  <span
                    className="material-symbols-outlined"
                    style={{ verticalAlign: "middle" }}
                  >
                    upload
                  </span>
                </>
              )}
            </label>
            <input
              type="file"
              name="audioFile"
              id="audioFile"
              onChange={handleFileChange}
            />
            {audioFile && <button type="submit">Upload</button>}
          </div>
        )}
        {errorUpload && (
          <p
            style={{
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {errorUpload} <span class="material-symbols-outlined">error</span>
          </p>
        )}
        {songAdded && (
          <p
            style={{
              color: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Song added <span className="material-symbols-outlined">done</span>
          </p>
        )}
      </form>
    </>
  );
}
