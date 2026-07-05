import { useState } from "react";
import API from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      // Debug
      console.log("Response:", res.data);
      console.log("User:", res.data.user);
      console.log("Role:", res.data.user.role);

      // Save login data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");

      // Reload the app so App.jsx reads the logged-in user
      window.location.href ="/";

    } catch (error) {
      console.log(error);
      alert("Login Failed!");
    }
  };

  return (
    <div className="container">
      <h2>Restaurant Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;