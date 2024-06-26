import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [response, setrepsonse] = useState("");
  let formHandle = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify({
        name: username,
        email: email,
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setrepsonse(data.message));
  };

  return (
    <div>
      {" "}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={formHandle}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formId">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ID"
                  value={id}
                  name="id"
                  onChange={(e) => setId(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>{" "}
    </div>
  );
}
