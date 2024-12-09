import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateGroup.css";
import Navigation from "./Navigation";

const CreateGroup = ({ users, addGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const navigate = useNavigate();

  const handleMemberChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedMembers(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || selectedMembers.length === 0) {
      alert("Molimo unesite naziv grupe i izaberite članove.");
      return;
    }

    const newGroup = {
      id: Date.now(), // Jedinstveni ID
      name: groupName,
      participants: selectedMembers.map(
        (id) => users.find((user) => user.id === parseInt(id)).name
      ),
      expenses: 0,
    };

    addGroup(newGroup);
    alert(`Grupa "${groupName}" je uspešno kreirana!`);
    navigate("/groups");
  };

  return (
    <>
    <Navigation/>
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
          <select
            id="members"
            multiple
            value={selectedMembers}
            onChange={handleMemberChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <small>Držite Ctrl (Cmd na Mac-u) za višestruki izbor.</small>
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
