import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, loading} = useLogin();
  const navigate = useNavigate();

  /**
   * Attempt to login with email and password inputs.
   * @param {object} e - onSubmit event to start login
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div className="formContainer centerElementsContainer">
      <button className="redirectButton" disabled={loading} onClick={() => navigate("/")}>Back</button>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log in</h3>

        {error && <h3 className="error">{error}</h3>}

        <label>Email:</label>
        <input
          className="locationSearchInput"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          className="locationSearchInput"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button id="loginButton" disabled={loading}>Log in</button>
      </form>
      
    </div>
  );
}

export default Login;
