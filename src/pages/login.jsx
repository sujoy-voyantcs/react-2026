import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("isAdmin", true);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <Container>
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <input type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
    </Container>
  );
}

export default Login;