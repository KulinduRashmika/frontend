import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Issued from './pages/issued';
import ViewBooks from './pages/ViewBooks';
import ViewMembers from './pages/ViewMembers';
import Staff from './pages/staff'; 
import Header from './components/header';
import Navbar from './components/navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  if (loading) {
    return (
      <div className="splash-screen">
        <h1>Library Management System</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
        {isLoggedIn && <Header />}
        {isLoggedIn && <Navbar onLogout={handleLogout} />}

        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route
              path="/issued"
              element={isLoggedIn ? <Issued /> : <Navigate to="/" replace />}
            />
            <Route
              path="/viewMembers"
              element={isLoggedIn ? <ViewMembers /> : <Navigate to="/" replace />}
            />
            <Route
              path="/viewBooks"
              element={isLoggedIn ? <ViewBooks /> : <Navigate to="/" replace />}
            />
            <Route
              path="/viewStaff"
              element={isLoggedIn ? <Staff /> : <Navigate to="/" replace />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="w-full bg-blue-600 text-white p-4 text-center text-sm">
          <p>&copy; 2025 Library Management System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
