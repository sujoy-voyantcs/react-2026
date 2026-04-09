import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginModal({ show, handleClose, setIsLoggedIn }) {
  const CORRECT_EMAIL = "admin@gmail.com";
  const CORRECT_PASSWORD = "1234";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault();

  if (!email) {
    setError("Please enter your email.");
    return;
  }

  if (!password) {
    setError("Please enter your password.");
    return;
  }

  if (email !== CORRECT_EMAIL) {
    setError("This email is not registered.");
    return;
  }

  if (password !== CORRECT_PASSWORD) {
    setError("Incorrect password. Please try again.");
    return;
  }

  // ✅ SUCCESS
  localStorage.setItem("isAdmin", true);
  setIsLoggedIn(true);

  handleClose();

  navigate("/dashboard");   
};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admin Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Error Message */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <br />

          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <br />

          <Button type="submit">Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;