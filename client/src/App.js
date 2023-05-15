import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useGlobalContext } from './context';
import ProtectedRoute from './pages/ProtectedRoute';
import Error from './pages/Error';

function App() {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <section className="page page-center">
        <div className="loading" />
      </section>
    );
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/*<ProtectedRoute>*/}
        {/*    <Route path='/dashboard' element={<Dashboard />} />*/}
        {/*</ProtectedRoute>*/}
      </Routes>
      {/* <Routes>
        <Route path="*" element={<Error />} />
      </Routes> */}
    </Router>
  );
}

export default App;
