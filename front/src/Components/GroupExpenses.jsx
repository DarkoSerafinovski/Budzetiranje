import React, { useState } from 'react';
import './GroupExpenses.css';
import Navigation from './Navigation';

// Primer podataka za troškove
const mockExpenses = [
  {
    id: 1,
    title: 'Večera u restoranu',
    paidBy: 'Marija',
    amountPaid: 3000,
    debts: [
      { name: 'Ana', amountOwed: 1500 },

    ],
  },
  {
    id: 2,
    title: 'Namirnice',
    paidBy: 'Ana',
    amountPaid: 2000,
    debts: [
      { name: 'Marija', amountOwed: 1000 },
    ],
  },
  {
    id: 3,
    title: 'Prevoz',
    paidBy: 'Marija',
    amountPaid: 3000,
    debts: [
      { name: 'Ana', amountOwed: 1500 },

    ],
  },
];

const currentUser = 'Marija'; // Korisnik koji je trenutno ulogovan

const GroupExpenses = () => {
  const [expenses, setExpenses] = useState(mockExpenses);

  const markAsPaid = (expenseId, debtorName) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === expenseId
          ? {
              ...expense,
              debts: expense.debts.filter((debt) => debt.name !== debtorName),
            }
          : expense
      )
    );
  };

  const handleAddExpense = () => {
    console.log('Dodavanje novog troška');
    // Logika za otvaranje modala ili navigaciju ka stranici za dodavanje troška
  };

  return (
    <>
        <Navigation/>
        <div className="expenses-container">
      <div className="header">
        <h2>Troškovi grupe</h2>
        <button className="add-expense-button" onClick={handleAddExpense}>
          + Dodaj novi trošak
        </button>
      </div>
      <div className="expenses-list">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-card">
            <div className="expense-header">
              <h3>{expense.title}</h3>
              <p className="expense-paid-by">
                <strong>{expense.paidBy}</strong> platio/la
              </p>
            </div>
            <p className="expense-amount">Ukupno: {expense.amountPaid} RSD</p>
            <div className="expense-debts">
              <h4>Dugovanja:</h4>
              {expense.debts.map((debt) => (
                <div key={debt.name} className="debt-item">
                  <span>
                    {debt.name} duguje <strong>{debt.amountOwed} RSD</strong>
                  </span>
                  {expense.paidBy === currentUser && (
                    <button
                      className="mark-paid-button"
                      onClick={() => markAsPaid(expense.id, debt.name)}
                    >
                      Plaćeno
                    </button>
                  )}
                </div>
              ))}
              {expense.debts.length === 0 && <p>Svi dugovi su plaćeni!</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default GroupExpenses;
