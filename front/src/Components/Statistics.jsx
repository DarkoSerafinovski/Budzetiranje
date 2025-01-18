import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Statistics.css";
import Navigation from "./Navigation";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  const [stats, setStats] = useState({
    total: 0,
    vip: 0,
    regular: 0,
    totalGroups: 0,
    totalAverageExpensesInGroups: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });
        setStats(response.data.data); // Assuming response data is in the same format
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Pie chart data for user distribution
  const userDistributionData = {
    labels: ["VIP", "Regular"],
    datasets: [
      {
        data: [stats.vip, stats.regular],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 4,
      },
    ],
  };

  // Bar chart data for expenses
  const expensesData = {
    labels: ["Ukupni troškovi", "Prosečan iznos po grupi"],
    datasets: [
      {
        label: "Troškovi",
        data: [stats.totalExpenses, stats.totalAverageExpensesInGroups],
        backgroundColor: "#FF5733",
        borderColor: "#FF5733",
        borderWidth: 1,
      },
    ],
  };

  const groupsData = {
    labels: ["Ukupno grupa", "Prosečan broj troškova po grupi"],
    datasets: [
      {
        label: "Grupe i troškovi",
        data: [stats.totalGroups, stats.totalAverageExpensesInGroups],
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navigation />
      <div className="admin-stats-page">
        <h1 className="page-title">Admin Statistika</h1>

        <div className="stats-grid">
          {/* Pie Chart for User Distribution */}
          <div className="stats-card">
            <h2>Distribucija korisnika</h2>
            <Pie data={userDistributionData} />
          </div>

          {/* Bar Chart for Expenses */}
          <div className="stats-card">
            <h2>Troškovi</h2>
            <Bar data={expensesData} />
          </div>

          {/* Bar Chart for Groups */}
          <div className="stats-card">
            <h2>Grupe i Troškovi</h2>
            <Bar data={groupsData} />
          </div>

          {/* Textual statistics */}
          <div className="stats-card">
            <h2>Ukupno korisnika</h2>
            <p className="stats-value">{stats.total}</p>
          </div>
          <div className="stats-card">
            <h2>VIP korisnici</h2>
            <p className="stats-value">{stats.vip}</p>
          </div>
          <div className="stats-card">
            <h2>Obični korisnici</h2>
            <p className="stats-value">{stats.regular}</p>
          </div>
          <div className="stats-card">
            <h2>Ukupno grupa</h2>
            <p className="stats-value">{stats.totalGroups}</p>
          </div>
          <div className="stats-card">
            <h2>Prosečan broj troškova po grupi</h2>
            <p className="stats-value">{stats.totalAverageExpensesInGroups}</p>
          </div>
          <div className="stats-card">
            <h2>Ukupna suma troškova</h2>
            <p className="stats-value">{stats.totalExpenses} RSD</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
