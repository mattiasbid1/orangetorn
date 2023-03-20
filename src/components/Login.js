import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await onLogin(apiKeyInput);
    if (!isValid) {
      setErrorMessage("Invalid API key. Please try again.");
    }
  };

  return (
    <Container className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="apiKey">
          <Form.Label>API Key</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="apiKey"
            placeholder="Enter API Key"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
