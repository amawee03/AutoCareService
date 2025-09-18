import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminNewService from './pages/AdminNewService';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/services/new" element={<AdminNewService />} />
      </Routes>
    </div>
  );
}
