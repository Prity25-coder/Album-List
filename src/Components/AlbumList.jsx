import React from "react";
import {Card } from "react-bootstrap";
import { useState, useEffect } from "react";

function AlbumList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="card-container">
        {data.map((item) => (
          <Card
            className="card"
            key={item.id}
            style={{
              width: "18rem",
            }}
          >
            <h5>{item.title}</h5>
            <p>{item.userId}</p>

            <div className="footer">
              <img
                src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                alt=""
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/15007/15007343.png"
                alt=""
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default AlbumList;
