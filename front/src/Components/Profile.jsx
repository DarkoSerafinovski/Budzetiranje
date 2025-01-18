import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Navigation from "./Navigation";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [groupCount, setGroupCount] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });

        const data = response.data;
        const user = data.user;

        setUsername(user.username);
        setEmail(user.email);
        setProfileImage(user.slika);
        setGroupCount(data.group_count);
        setTotalDebt(data.total_debts);
        setTotalClaims(data.total_claims);
        setIsLoading(false);
      } catch (err) {
        console.error("Greška pri učitavanju podataka:", err);
        setIsLoading(false); 
        setError("Došlo je do greške prilikom učitavanja podataka.");
      }
    };

    fetchProfileData();
  }, []);

  



  if (isLoading) {
    return <div className="loading-message">Učitavanje podataka...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <Navigation />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profilna slika"
                className="profile-image"
              />
              
            </div>
            <h1 className="profile-username">{username}</h1>
            <p className="profile-email">{email}</p>
          </div>
          <div className="profile-details">
            <div className="profile-stat">
              <h3>Broj Grupa</h3>
              <p>{groupCount}</p>
            </div>
            <div className="profile-stat">
              <h3>Ukupna Dugovanja</h3>
              <p>${totalDebt}</p>
            </div>
            <div className="profile-stat">
              <h3>Ukupna Potraživanja</h3>
              <p>${totalClaims}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
