import React, { useState } from "react";
import "./VipPersonalExpenses.css";
import Navigation from "./Navigation";

const VipPersonalExpenses = () => {
  // State for expenses and new expense input
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Kupovina garderobe", amount: 15000 },
    { id: 2, description: "Pretplata na časopis", amount: 2500 },
    { id: 3, description: "Godišnja članarina", amount: 12000 },
  ]);

  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  // Add new expense
  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      setExpenses([
        ...expenses,
        { id: expenses.length + 1, description: newExpense.description, amount: parseFloat(newExpense.amount) },
      ]);
      setNewExpense({ description: "", amount: "" });
    }
  };

  return (
    <>
        <Navigation/>
        <div className="vip-personal-expenses">
        <h1 className="page-title">Lični Troškovi</h1>

        <div className="expenses-list">
            {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
                <span className="expense-description">{expense.description}</span>
                <span className="expense-amount">{expense.amount.toLocaleString()} RSD</span>
            </div>
            ))}
        </div>

        <div className="add-expense-form">
            <input
            type="text"
            name="description"
            placeholder="Opis troška"
            value={newExpense.description}
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