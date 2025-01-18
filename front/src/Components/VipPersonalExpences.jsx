import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VipPersonalExpenses.css";
import Navigation from "./Navigation";

const VipPersonalExpenses = () => {
  // State for expenses and new expense input
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  // Učitavanje troškova sa API-ja
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/vip/personal-expenses", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        });
        setExpenses(response.data.data); // Pretpostavka da je `data` lista troškova
      } catch (error) {
        console.error("Greška pri učitavanju troškova:", error);
      }
    };
    fetchExpenses();
  }, []);

  // Promena vrednosti u inputima za novi trošak
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  // Dodavanje novog troška
  const addExpense = async () => {
    if (!newExpense.name || !newExpense.amount) {
      alert("Popunite sva polja!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/vip/personal-expenses",
        {
          name: newExpense.name,
          amount: parseFloat(newExpense.amount),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
          },
        }
      );

      // Dodavanje novog troška u listu
      setExpenses((prevExpenses) => [...prevExpenses, response.data.data]);
      setNewExpense({ name: "", amount: "" }); // Resetovanje inputa
    } catch (error) {
      console.error("Greška pri dodavanju troška:", error);
      alert("Došlo je do greške prilikom dodavanja troška.");
    }
  };

  // Formatiranje datuma u dan/mesec/godina
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <>
      <Navigation />
      <div className="vip-personal-expenses">
        <h1 className="page-title">Lični Troškovi</h1>

        <div className="expenses-list">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <span className="expense-name">{expense.name}</span>
              <span className="expense-date">{formatDate(expense.date)}</span>
              <span className="expense-amount">{expense.amount.toLocaleString()} RSD</span>
            </div>
          ))}
        </div>

        <div className="add-expense-form">
          <input
            type="text"
            name="name"
            placeholder="Naziv troška"
            value={newExpense.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Iznos (RSD)"
            value={newExpense.amount}
            onChange={handleInputChange}
          />
          <button className="add-expense-button" onClick={addExpense}>
            Dodaj Trošak
          </button>
        </div>
      </div>
    </>
  );
};

export default VipPersonalExpenses;
