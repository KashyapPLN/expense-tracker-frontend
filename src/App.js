import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Signup from './Components/login/Signup';
import Login from './Components/login/Login';
import Profile from './Components/profile/Profile';
import AddExpense from './Components/expense-components/AddExpense';
import Expenses from './Components/expense-components/Expenses';
import NavBar from './Components/NavBar';
import Charts from './Components/expense-components/ExpenseCharts.js';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className="App">
      {token && <NavBar handleLogout={handleLogout} />}
      <Routes>
    
        {token ? (

          <>
            <Route path='/profile' element={<Profile handleLogout={handleLogout} />} />
            <Route path='/add' element={<AddExpense />} />
            <Route path='/expenses' element={<Expenses />} />
            <Route path='/expenses-chart' element={<Charts />} />
            <Route path='/register' element={<Navigate to="/profile" />} />
            <Route path='/login' element={<Navigate to="/profile" />} />
            <Route path='/' element={<Navigate to="/expenses" />} />

          </>
        ) : (
          <>
          
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Navigate to="/register" />} />
      
            <Route path='/profile' element={<Navigate to="/login" />} />
            <Route path='/add' element={<Navigate to="/login" />} />
            <Route path='/expenses' element={<Navigate to="/login" />} />
            <Route path='/expenses-chart' element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
