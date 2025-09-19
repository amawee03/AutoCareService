import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServicesPage from './pages/packages/ServicesPage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ServiceSelection from './components/ServiceSelection';
// import AppointmentCalendar from './components/AppointmentCalendar';
import AppointmentForm from './components/AppointmentForm';
import PaymentPage from './pages/PaymentPage';
import AppointmentSuccess from './components/AppointmentSuccess';
import AppointmentFailure from './components/AppointmentFailure';
import ServiceForm from './components/services/ServiceForm';
import ContactUsPage from './pages/ContactUsPage';
import InventoryDashboard from './pages/inventory/InventoryDashboard';



export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/services/new" element={<ServiceForm />} />
        {/* Appointment Booking Routes */}
        <Route path="/appointment" element={<ServiceSelection />} />
        {/* <Route path="/appointment/calendar" element={<AppointmentCalendar />} /> */}
        <Route path="/appointment/details" element={<AppointmentForm />} />
        <Route path="/appointment/payment" element={<PaymentPage />} />
        <Route path="/appointment/success" element={<AppointmentSuccess />} />
        <Route path="/appointment/failure" element={<AppointmentFailure />} />
        <Route path="/inventory" element={<InventoryDashboard />} />
      </Routes>
    </div>
  );
}
