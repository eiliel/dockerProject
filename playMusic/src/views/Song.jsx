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
    const path = `http://localhost:3001/uploads/${title}_${selectedArtist}.mp3`;
    formData.append('title', title);
    formData.append('artistId', selectedArtist);
    formData.append('audioFile', e.target.audioFile.files[0]);
    formData.append('audioUrl', path);
  
    axios
      .post('http://localhost:3001/audios', formData)
      .then((response) => {
        setSongAdded(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'upload :", error);
        setErrorUpload(error.response.data.error);
      });
  };

  return (
    <>
      <NavBar />
      <h2>Add a song</h2>
      <form encType="multipart/form-data" onSubmit={handleUpload}>

        <label htmlFor="artistSelect">Choose an artist </label>
        <select name="artistsList" id="artistSelect" onChange={(e) => setSelectedArtist(e.target.value)}>
          <option value="">-- Please choose an artist --</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>{artist.name}</option>
          ))}
        </select>
        
        {selectedArtist && (
          <>
        <label htmlFor="songTitle">Enter song title </label>
        <input type="text" name="songTitle" id="songTitle" onChange={(e) => setTitle(e.target.value)}/></>)}

        {title &&(
          <div className="spaceDiv">
            <label htmlFor="audioFile" className="fileButton">Choose File</label>
            <input type="file" name="audioFile" id="audioFile" onChange={(e) => setAudioFile(e.target.value)}/>
            {audioFile && (
            <button type="submit">Upload</button>)}
          </div>
        )}
        {errorUpload && (<p style={{ color: "red" }}>{errorUpload }</p>)}
        {songAdded && <p style={{ color: "green" }}>Song added</p>}
      </form>
    </>
  );
}
