import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServicesPage from './pages/packages/ServicesPage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ServiceSelection from './components/ServiceSelection';
import AppointmentForm from './components/AppointmentForm';
import PaymentPage from './pages/PaymentPage';
import AppointmentSuccess from './components/AppointmentSuccess';
import AppointmentFailure from './components/AppointmentFailure';
import ServiceForm from './components/services/ServiceForm';
import ContactUsPage from './pages/ContactUsPage';
import AdminNewService from './pages/Admin/AdminNewService';
import AdminManageServices from './pages/Admin/AdminManageServices';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path = "/admin/manageservices" element = {<AdminManageServices/>}/>
        {/* <Route path="/admin/services/new" element={<ServiceForm />} /> */}
          <Route path="/admin/services/new" element={<AdminNewService />} />

        {/* Appointment Booking */}
        <Route path="/appointment" element={<ServiceSelection />} />
        <Route path="/appointment/details" element={<AppointmentForm />} />
        <Route path="/appointment/payment" element={<PaymentPage />} />
        <Route path="/appointment/success" element={<AppointmentSuccess />} />
        <Route path="/appointment/failure" element={<AppointmentFailure />} />

       
      </Routes>
    </div>
  );
}
