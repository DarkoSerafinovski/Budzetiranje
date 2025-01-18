import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GroupExpenses.css';
import Navigation from './Navigation';
import { useParams } from 'react-router-dom';

const GroupExpenses = () => {
  const { id } = useParams(); // Uzimamo ID grupe sa URL-a
  const [expenses, setExpenses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Korisnik koji je trenutno ulogovan
  const [showModal, setShowModal] = useState(false); // Za prikazivanje modala
  const [newExpense, setNewExpense] = useState({
    amount: '',
    purpose: '',
  });
  const [filterType, setFilterType] = useState('all'); // Novi filter za tip potraživanja/dugovanja
  const [filteredExpenses, setFilteredExpenses] = useState([]); // Filtrirani troškovi
  const [filterPurpose, setFilterPurpose] = useState(''); // Filter za svrhu
  const [filterAmount, setFilterAmount] = useState(0); // Filter za minimalnu cenu
  const [filterStatus, setFilterStatus] = useState('all'); // Filter za status (sve, plaćeno, neplaćeno)
  const [currency, setCurrency] = useState('RSD'); // Default currency is RSD
  const [exchangeRates, setExchangeRates] = useState({}); // Exchange rates for conversion
  const authToken = sessionStorage.getItem('auth_token'); // Uzima authorization token sa sessionStorage

  // Funkcija za preuzimanje grupnih troškova
  const fetchGroupExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data && response.data.data) {
        setExpenses(response.data.data.expenses); // Postavljanje grupnih troškova
        setCurrentUser(sessionStorage.getItem('user_id')); // Postavljanje trenutno ulogovanog korisnika
      } else {
        console.error('Nepravilna struktura podataka:', response);
      }
    } catch (error) {
      console.error('Greška prilikom dobijanja grupnih troškova:', error);
    }
  };

  // Funkcija za preuzimanje kursnih stopa
  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/RSD'); // Example API endpoint
      setExchangeRates(response.data.rates); // Storing exchange rates
    } catch (error) {
      console.error('Greška prilikom dobijanja kursnih stopa:', error);
    }
  };

  // Funkcija za konvertovanje iznosa u odabranu valutu
  const convertCurrency = (amount) => {
    if (currency === 'RSD') return amount;
    return (amount * (exchangeRates[currency] || 1)).toFixed(2); // Return converted amount
  };

  useEffect(() => {
    fetchGroupExpenses(); // Pozivanje funkcije za preuzimanje podataka kada se komponenta učita
    fetchExchangeRates(); // Fetch exchange rates on component mount
  }, [id, authToken]);

  useEffect(() => {
    // Filtriranje troškova na osnovu unetih vrednosti
    const filtered = expenses.filter((expense) => {
      const matchesPurpose = expense.purpose.toLowerCase().includes(filterPurpose.toLowerCase());
      const matchesAmount = filterAmount ? expense.amount >= filterAmount : true;
      const matchesStatus =
        filterStatus === 'all' ||
        expense.debts.some((debt) => debt.status === filterStatus);
      const matchesType =
        filterType === 'all' ||
        (filterType === 'claims' && expense.debts.some((debt) => debt.creditor.id == currentUser)) ||
        (filterType === 'debts' && expense.debts.some((debt) => debt.debtor.id == currentUser));
  
      return matchesPurpose && matchesAmount && matchesStatus && matchesType;
    });
    setFilteredExpenses(filtered);
  }, [filterPurpose, filterAmount, filterStatus, filterType, expenses, currentUser]);

  // Funkcija za označavanje duga kao plaćenog
  const markAsPaid = async (debtClaimId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/groups/group-expenses/${debtClaimId}/pay`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // Osvežavanje podataka nakon uspešnog plaćanja
      fetchGroupExpenses(); // Pozivanje funkcije za osvežavanje podataka
    } catch (error) {
      console.error('Greška prilikom označavanja duga kao plaćenog:', error);
    }
  };

  const renderDebts = (expense) => {
    const allDebtsPaid = expense.debts.every((debt) => debt.status === 'paid'); // Provera da li su svi dugovi plaćeni

    return expense.debts.map((debt) => {
      const isPaid = debt.status === 'paid'; // Provera da li je dug plaćen

      if (debt.debtor.id == currentUser) {
        return (
          <div key={debt.debtor.id} className={`debt-item ${isPaid ? 'paid' : ''}`}>
            <span>
              {debt.debtor.username} duguje <strong>{convertCurrency(debt.amount)} {currency}</strong>
            </span>
            {debt.status === 'unpaid' ? (
              <button
                className="mark-paid-button"
                onClick={() => markAsPaid(debt.id, debt.debtor.id)}
              >
                Plaćeno
              </button>
            ) : (
              <span className="paid-message">Dug je plaćen</span>
            )}
          </div>
        );
      }

      if (expense.payer.id == currentUser && debt.status === 'unpaid') {
        return (
          <div key={debt.debtor.id} className={`debt-item ${isPaid ? 'paid' : ''}`}>
            <span>
              {debt.debtor.username} duguje <strong>{convertCurrency(debt.amount)} {currency}</strong>
            </span>
          </div>
        );
      }

      return null;
    }).concat(
      allDebtsPaid && <p className="expense-paid-message">Trošak je potpuno isplaćen!</p>
    );
  };

  // Funkcija za dodavanje novog troška
  const handleAddExpense = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/groups/group-expenses',
        {
          group_id: id,
          amount: newExpense.amount,
          purpose: newExpense.purpose,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // Osvežavanje podataka nakon dodavanja troška
      fetchGroupExpenses();
      setShowModal(false); // Zatvaranje modala
    } catch (error) {
      console.error('Greška prilikom dodavanja troška:', error);
    }
  };

  // Funkcija za praćenje unosa u formi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  // Funkcija za formatiranje datuma u format dan/mesec/godina
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Dodaj nulu ako je dan sa jednim brojem
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodaj nulu ako je mesec sa jednim brojem
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Navigation />
      <div className="expenses-container">
        <div className="header">
          <h2>Troškovi grupe</h2>
          <button className="add-expense-button" onClick={() => setShowModal(true)}>
            + Dodaj novi trošak
          </button>
        </div>




      
         
       



        <div className="filters">
          <label>
            Filtriraj po svrsi:
            <input
              type="text"
              placeholder="Unesite svrhu..."
              value={filterPurpose}
              onChange={(e) => setFilterPurpose(e.target.value)}
            />
          </label>
          <label>
            Filtriraj po minimalnoj ceni:
            <input
              type="number"
              placeholder="Minimalna cena..."
              value={filterAmount}
              onChange={(e) => setFilterAmount(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Filtriraj po statusu:
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Sve</option>
              <option value="paid">Plaćeno</option>
              <option value="unpaid">Neplaćeno</option>
            </select>
          </label>
              <label>
        Filtriraj po tipu:
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Sve</option>
          <option value="claims">Moja potraživanja</option>
          <option value="debts">Moja dugovanja</option>
        </select>
      </label>


      <label>
            Odaberi valutu:
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="RSD">RSD</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="CHF">CHF</option>
            </select>
          </label>
        </div>

        <div className="expenses-list">
          {filteredExpenses.length === 0 ? (
            <p>Ova grupa nema grupne troškove koji odgovaraju filtrima.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="expense-card">
                <div className="expense-header">
                  <h3>{expense.purpose}</h3>
                  <p className="expense-date">Datum: {formatDate(expense.date)}</p>
                  <p className="expense-paid-by">
                    <strong>{expense.payer.username}</strong> platio/la
                  </p>
                </div>
                <p className="expense-amount">Ukupno: {convertCurrency(expense.amount)} {currency}</p>
                <div className="expense-debts">
                  <h4>Dugovanja:</h4>
                  {renderDebts(expense)}
                  {expense.debts.length === 0 && <p>Svi dugovi su plaćeni!</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal za dodavanje novog troška */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Dodaj novi trošak</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <form className="modal-form">
              <label>
                Svrha: 
                <input
                  type="text"
                  name="purpose"
                  value={newExpense.purpose}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Iznos:
                <input
                  type="number"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  required
                  min="0.01"
                  step="0.01"
                />
              </label>
              <button type="button" className="save-expense-button" onClick={handleAddExpense}>
                Sačuvaj trošak
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupExpenses;
