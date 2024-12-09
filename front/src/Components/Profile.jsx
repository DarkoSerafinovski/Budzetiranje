import React, { useState } from "react";
import "./Profile.css";
import Navigation from "./Navigation";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [groupCount, setGroupCount] = useState(5);
  const [totalDebt, setTotalDebt] = useState(1000);
  const [totalClaims, setTotalClaims] = useState(1500);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
                <input
                type="file"
                className="upload-input"
                onChange={handleImageUpload}
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
