import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

export default function Artist() {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState("");
  const [errorUpload, setErrorUpload] = useState(null);
  const [artistAdded, setArtistAdded] = useState(false);

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

  const handleAddArtist = (e) => {
    e.preventDefault();
    const artistData = { name: newArtist };

    axios
      .post("http://localhost:3001/artists", artistData)
      .then((response) => {
        console.log("Artiste ajouté", response.data);
        // Réinitialisez le formulaire ou affichez un message de succès
        setNewArtist("");
        setArtists([...artists, response.data]);
        setArtistAdded(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'artiste :", error);
        setErrorUpload(error.response.data.error);
      });
  };

  return (
    <>
      <NavBar />
      <h2>Add an artist</h2>
      <form onSubmit={handleAddArtist}>
        <label htmlFor="newArtist">Name of the artist : </label>
        <input
          id="newArtist"
          type="text"
          value={newArtist}
          onChange={(e) => setNewArtist(e.target.value)}
        />
        <button type="submit" id="addButton">
          Add
        </button>
      </form>

      <div>
        <h3>List of the artists</h3>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
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
        {artistAdded && (
          <p
            style={{
              color: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Artist added <span className="material-symbols-outlined">done</span>
          </p>
        )}
      </div>
    </>
  );
}
