import React, { useState } from "react";
import axios from "axios";
import "./CreateGroup.css";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
    const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState(() => {
    const loggedUserId = sessionStorage.getItem("user_id");
    return loggedUserId ? [loggedUserId] : [];
  });
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loggedUserId = sessionStorage.getItem("user_id");

  // Funkcija za učitavanje korisnika
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Greška pri učitavanju korisnika:", error);
    }
  };

  if (users.length === 0) {
    fetchUsers();
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddMember = (userId) => {
    if (!selectedMembers.includes(userId)) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        userId,
      ]);
    }
  };

  const handleRemoveMember = (userId) => {
    if (userId !== loggedUserId) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName || selectedMembers.length === 0) {
      alert("Molimo unesite naziv grupe i izaberite članove.");
      return;
    }

    const newGroup = {
      name: groupName,
      users: selectedMembers,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/groups",
        newGroup,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        }
      );

      alert(`Grupa "${newGroup.name}" je uspešno kreirana!`);
      navigate('/groups');      
    } catch (error) {
      console.error("Greška pri kreiranju grupe:", error);
      alert("Došlo je do greške prilikom kreiranja grupe.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navigation />
      <div className="create-group-container">
        <h2>Kreiraj Novu Grupu</h2>
        <form className="create-group-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="groupName">Naziv grupe:</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Unesite naziv grupe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="members">Izaberite članove:</label>
            <input
              type="text"
              placeholder="Pretraži korisnike"
              value={search}
              onChange={handleSearchChange}
            />

            <select
              multiple
              value={selectedMembers}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setSelectedMembers((prevSelectedMembers) => [
                  ...prevSelectedMembers,
                  ...selectedOptions.filter(
                    (id) => !prevSelectedMembers.includes(id)
                  ),
                ]);
              }}
              className="user-select"
            >
              {filteredUsers.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  disabled={selectedMembers.includes(user.id)}
                >
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="selected-members">
            <h3>Izabrani članovi:</h3>
            <ul>
              {selectedMembers.map((memberId) => {
                const user = users.find((user) => user.id === parseInt(memberId));
                return (
                  <li key={memberId}>
                    {user ? user.username : "Nepoznat korisnik"}{" "}
                    {user && user.id !== parseInt(loggedUserId) && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(memberId)}
                      >
                        Ukloni
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <button type="submit" className="submit-button">
            Kreiraj Grupu
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
