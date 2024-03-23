import { useEffect, useState } from "react";

import { AlbumForm, AlbumList, Nav } from "./Components";
import FORM_MODE from "./constants/formMode";

import "./App.css";

const URI = "https://jsonplaceholder.typicode.com/albums";

function App() {
  const [albums, setAlbums] = useState([]);
  const [mode, setMode] = useState(FORM_MODE.CREATE);
  const [albumData, setAlbumData] = useState(null);

  // Fetch data from album json placeholder API
  const fetchData = async () => {
    try {
      const response = await fetch(URI);
      const data = await response.json();
      console.log(data);
      setAlbums(data);
    } catch (error) {
      console.log("ERROR", error);
      alert("something went wrong!");
    }
  };

  // Add data to album list
  const onSubmit = async (albumData) => {
    const options = {
      method: "POST",
      body: JSON.stringify(albumData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const response = await fetch(URI, options);
      const data = await response.json();
      console.log(data);
      setAlbums([...albums, { ...data, id: albums.length + 1 }]);
    } catch (error) {
      console.log("ERROR", error);
      alert("something went wrong!");
    }
  };

  // update(PUT) data to album list
  const updateAlbumData = async (id, albumData) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(albumData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    try {
      const response = await fetch(`${URI}/${id}`, options);

      const deleteData = await response.json();
      setAlbums((albums) =>
        albums.map((album) =>
          album.id === id ? { ...album, ...albumData } : album
        )
      );
      console.log(deleteData);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete data from Album list
  const deleteAlbumListData = async (id) => {
    const confirmed = confirm("Are you sure you want to delete");
    if (!confirmed) return;

    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(`${URI}/${id}`, options);
      const data = await response.json();

      setAlbums((albums) => albums.filter((album) => album.id !== id));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <AlbumForm
        mode={mode}
        onSubmit={onSubmit}
        albumData={albumData}
        setAlbumData={setAlbumData}
        setMode={setMode}
        updateAlbumData={updateAlbumData}
      />
      <AlbumList
        albums={albums}
        setMode={setMode}
        setCurrentUpdateData={setAlbumData}
        deleteAlbumListData={deleteAlbumListData}
      />
    </>
  );
}

export default App;
