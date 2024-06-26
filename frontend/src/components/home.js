import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../home.css";
export default function Updatedhome() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      let url = searchTerm
        ? `http://localhost:8000/search?searchItem=${searchTerm}`
        : "http://localhost:8000/videos";
      const response = await fetch(url);
      const data = await response.json();
      setVideos(data);
    };

    fetchVideos().catch((error) => console.error("Error:", error));
  }, [searchTerm]);

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
          <h2 className="video-title">{vid.title}</h2>
          <p className="video-description">{vid.description}</p>
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
