import React, { useState } from "react";
import "./Users.css";
import Navigation from "./Navigation";

const Users = () => {
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: "Marko Jovanović", email: "marko.jovanovic@example.com", role: "regular" },
    { id: 2, name: "Ana Petrović", email: "ana.petrovic@example.com", role: "vip" },
    { id: 3, name: "Ivana Nikolić", email: "ivana.nikolic@example.com", role: "regular" },
    { id: 4, name: "Milan Marković", email: "milan.markovic@example.com", role: "vip" },
  ]);

  // Function to toggle user role
  const toggleUserRole = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "regular" ? "vip" : "regular" }
          : user
      )
    );
  };

  return (
    <>
        <Navigation/>
        <div className="admin-users-page">
        <h1 className="page-title">Administracija Korisnika</h1>
        <table className="users-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Ime i Prezime</th>
                <th>Email</th>
                <th>Uloga</th>
                <th>Akcije</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={user.role === "vip" ? "vip-role" : "regular-role"}>{user.role}</td>
                <td>
                    <button
                    className="toggle-role-button"
                    onClick={() => toggleUserRole(user.id)}
                    >
                    {user.role === "regular" ? "Promeni u VIP" : "Promeni u Običnog"}
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </>
  );
};

export default Users;