import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";
import Navigation from "./Navigation";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [authToken] = useState(sessionStorage.getItem("auth_token"));
  const usersPerPage = 5;

  useEffect(() => {
    // Fetching users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/edit", {
          params: {
            page: pagination.currentPage,
            per_page: usersPerPage,
          },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data && response.data.data) {
          setUsers(response.data.data);
          setPagination({
            currentPage: response.data.meta.current_page,
            totalPages: response.data.meta.last_page,
            totalItems: response.data.meta.total,
          });
        } else {
          console.error("Nepravilna struktura podataka:", response);
        }
      } catch (error) {
        console.error("Greška prilikom dobijanja korisnika:", error);
      }
    };

    fetchUsers();
  }, [pagination.currentPage, authToken]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const toggleUserRole = async (userId) => {
    try {
     
      const response = await axios.post(
        "http://localhost:8000/api/users/change-role", 
        { user_id: userId,
          _method:'PUT'
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data && response.data.message === "Uspesno izmenjena rola usera") {
        // Update user role locally
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, role: user.role === "regular" ? "vip" : "regular" }
              : user
          )
        );
      } else {
        console.error("Greška pri promeni role:", response);
      }
    } catch (error) {
      console.error("Greška pri pozivanju API-ja:", error);
    }
  };

  return (
    <>
      <Navigation />
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
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className={user.role === "vip" ? "vip-role" : "regular-role"}>
                  {user.role}
                </td>
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

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
          >
            Prethodna
          </button>
          <span className="pagination-info">
            Stranica {pagination.currentPage} od {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="pagination-button"
          >
            Sledeća
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
