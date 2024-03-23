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
      const response = await fetch(
        URI,
        options
      );
      const data = await response.json();
      console.log(data);
      setAlbums([...albums, { ...data, id: albums.length + 1 }]);
    } catch (error) {
      console.log("ERROR", error);
      alert("something went wrong!");
    }
  };

  // update(PUT) data to album list
  const updateAlbumData = async (albumData) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(albumData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    try {
      const response = await fetch(
        URI,
        options
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete data from Album list
  const deleteAlbumListData = async (id) => {
    const conform = window.confirm("Are you sure you want to delete")
    if (conform.ok) {
      const options = {
        method: "DELETE",
      };
      try {
        const response = await fetch(
          URI+id,
          options
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    
  };

  useEffect(() => {
    fetchData();
    deleteAlbumListData();

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
      />
      <AlbumList
        albums={albums}
        setMode={setMode}
        setCurrentUpdateData={setAlbumData}
      />
    </>
  );
}

export default App;
