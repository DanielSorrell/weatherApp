import { React, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {register, error, loading} = useRegister();
  const navigate = useNavigate();

  /**
   * Attempt to register account with email and password inputs.
   * @param {object} e - onSubmit event to start account registration
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
  }

  return (
    <div className="formContainer centerElementsContainer">
      <button className="redirectButton" disabled={loading} onClick={() => navigate("/")}>Back</button>
      <form className="register" onSubmit={handleSubmit}>
        <h3>Create account</h3>

        {error && <div className="error">{error}</div>}

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

        <button disabled={loading}>Create account</button>
      </form>
    
    </div>
  );
}

export default Register;
