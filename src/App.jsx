import { useEffect, useState } from "react";

import { AlbumForm } from "./Components";
import Nav from "./Components/Nav";
import AlbumList from "./Components/AlbumList";
import FORM_MODE from "./constants/formMode";

import "./App.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const [mode, setMode] = useState(FORM_MODE.CREATE);
  const [albumData, setAlbumData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const data = await response.json();
      console.log(data);
      setAlbums(data);
    } catch (error) {
      console.log("ERROR", error);
      alert("something went wrong!");
    }
  };

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
        "https://jsonplaceholder.typicode.com/albums",
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
