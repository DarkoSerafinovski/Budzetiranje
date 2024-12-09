import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Groups from './Components/Groups';
import GroupExpenses from './Components/GroupExpenses';
import CreateGroup from './Components/CreateGroup';
import Statistics from './Components/Statistics';
import Users from './Components/Users';
import VipPersonalExpenses from './Components/VipPersonalExpences';

function App() {
  const [groups, setGroups] = useState([
    { id: 1, name: "More", participants: ["Marija", "Ana"], expenses: 3 },   
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Ana" },
    { id: 2, name: "Marko" },
    { id: 3, name: "Marija" },
    { id: 4, name: "Ivana" },
    { id: 5, name: "Nikola" },
  ]);

  const addGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/groups" element={<Groups groups={groups} />} />
          <Route path="/groups/:id" element={<GroupExpenses />} />
          <Route path="/create-group" element={<CreateGroup users={users} addGroup={addGroup} />} />
          <Route path="/statistika" element={<Statistics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/personal-expences" element={<VipPersonalExpenses />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
