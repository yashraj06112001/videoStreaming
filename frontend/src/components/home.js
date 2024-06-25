import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/videos")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1 className="d-flex justify-content-between">
        Hi welcome to Home
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </h1>
      {videos.map((vid) => (
        <div key={vid.id}>
          <h2>{vid.title}</h2>
          <p>{vid.description}</p>
          <video controls>
            <source
              src={`http://localhost:8000/${vid.video}`}
              type="video/mp4"
            />
          </video>
        </div>
      ))}
    </div>
  );
}
