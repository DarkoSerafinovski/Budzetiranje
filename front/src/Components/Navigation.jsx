import React, { useState, useEffect } from "react";
import "./Navigation.css";

const Navigation = () => {
  // Postavljanje trenutne uloge
  const [role, setRole] = useState("vip"); // Default uloga

  useEffect(() => {
    // Provera uloge iz sessionStorage
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Funkcija za generisanje navigacije na osnovu uloge
  const renderNavigationLinks = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <li><a href="/users">Svi Korisnici</a></li>
            <li><a href="/statistika">Statistika</a></li>
          </>
        );
      case "vip":
        return (
          <>
            <li><a href="/profile">Moj Profil</a></li>
            <li><a href="/groups">Grupe</a></li>
            <li><a href="/create-group">Napravi Grupu</a></li>
            <li><a href="/personal-expences">Licni Troskovi</a></li>
          </>
        );
      case "regular":
        return (
          <>
            <li><a href="/profile">Moj Profil</a></li>
            <li><a href="/groups">Grupe</a></li>
            <li><a href="/create-group">Napravi Grupu</a></li>
          </>
        );
      default:
        return null; // U slučaju da nema definisane uloge
    }
  };

  // Funkcija za logout
  const handleLogout = () => {
    sessionStorage.removeItem("role"); // Briše ulogu iz sessionStorage
    window.location.href = "/"; // Vraća korisnika na početnu stranicu
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-links">
          {renderNavigationLinks()}
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
