import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      recordedChunksRef.current.push(e.data);
    }
  };
  const videoRef = useRef();
  const recordVideo = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Assign the stream to the video element's srcObject property
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start();
    } else {
      console.error("Media devices API not available");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      setVideo(blob);
      recordedChunksRef.current = [];
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    formData.append("video", video, video.name);
    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };
  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Video Title:</Label>
          <Input
            type="text"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">Video Description:</Label>
          <Input
            type="textarea"
            id="description"
            name="description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="video">Upload Video:</Label>
          <Input
            type="file"
            id="video"
            name="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
        </FormGroup>

        <Button color="primary" onClick={recordVideo}>
          Record Video
        </Button>
        <Button color="secondary" onClick={stopRecording} className="ml-2">
          Stop Recording
        </Button>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
