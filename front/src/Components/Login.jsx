import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios
      .post('http://localhost:8000/api/login', userData)
      .then((response) => {
        if (response.data.success) {
          sessionStorage.setItem('auth_token', response.data.access_token);
          sessionStorage.setItem('role', response.data.role);
          sessionStorage.setItem('user_id', response.data.data.id);

          if(response.data.role==='admin'){
            navigate('/statistika');
          }
          else{
            navigate('/profile');
          }
          
        } else {
          setError('Neispravan email ili šifra.');
        }
      })
      .catch((err) => {
        console.error('Greška pri prijavi:', err);
        setError('Došlo je do greške. Molimo pokušajte ponovo.');
      });
   
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Prijava</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Lozinka</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="submit-btn" type="submit">Prijavi se</button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <label htmlFor="register">Nemate Nalog?</label>
      <button className="register-link" onClick={goToRegister}>
        Registruj se
      </button>
    </div>
  );
};

export default Login;
