import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dodajte logiku za validaciju i slanje podataka
    console.log("Registracija uspešna");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Registracija</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Korisničko ime</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Unesite korisničko ime"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Unesite svoj email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Ponovite Lozinku</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Ponovite lozinku"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Registrujte se
          </button>
          <p className="login-footer">
            Imate nalog? <a href="/">Prijavite se</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
