import React from "react";
import { useNavigate } from "react-router-dom";
import "./Groups.css";
import Navigation from "./Navigation";

const Groups = ({ groups }) => {
  const navigate = useNavigate();

  const navigateToGroupPage = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <>
      <Navigation />
      <div className="groups-container">
        {groups.map((group) => (
          <div
            key={group.id}
            className="group-card"
            onClick={() => navigateToGroupPage(group.id)}
          >
            <h3 className="group-name">{group.name}</h3>
            <p className="group-participants">
              Učesnici: {group.participants.join(", ")}
            </p>
            <p className="group-expenses">Broj troškova: {group.expenses}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Groups;
