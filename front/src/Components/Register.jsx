import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [slika, setSlika] = useState(null);
  const navigate = useNavigate();  


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlika(file); 
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password',password);
    formData.append('role','regular');
    formData.append('slika',slika);

     

    try {
  
      const response = await axios.post('http://localhost:8000/api/register', formData, {
        headers: {
          'Authorization': "Bearer " + sessionStorage.getItem("auth_token"),
          'Content-Type': 'multipart/form-data', 
        },
      });

      alert('Uspesna registracija');
     
      setUsername('');
      setEmail('');
      setPassword('');
      setSlika(null);
      navigate('/');
    } catch (error) {
      console.error('Greška prilikom slanja podataka:', error);
    }
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

          <div className="form-group">
            <label htmlFor="slika">Slika profila</label>
            <input
              type="file"
              id="slika"
              accept="image/*"
              onChange={handleImageChange}
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
