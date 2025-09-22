import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StatsCard from '@/components/dashboards/StatsCard';
import AppointmentCard from '@/components/appointments/AppointmnetCard';
import {
  CalendarIcon,
  UsersIcon,
  WrenchIcon,
  DollarSignIcon,
  ClipboardCheckIcon,
} from 'lucide-react';

const AdminDashboard = () => {
  // Sample data
  const stats = [
    {
      title: 'Total Appointments',
      value: 248,
      icon: <CalendarIcon size={24} className="text-blue-600" />,
      change: {
        value: '12%',
        positive: true,
      },
    },
    {
      title: 'Active Customers',
      value: 573,
      icon: <UsersIcon size={24} className="text-green-600" />,
      change: {
        value: '4%',
        positive: true,
      },
    },
    {
      title: 'Services Offered',
      value: 24,
      icon: <WrenchIcon size={24} className="text-amber-600" />,
    },
    {
      title: 'Monthly Revenue',
      value: '₹1,25,780',
      icon: <DollarSignIcon size={24} className="text-red-600" />,
      change: {
        value: '8%',
        positive: true,
      },
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      service: 'Premium Detailing',
      customer: 'John Doe',
      date: 'May 15, 2023',
      time: '10:00 AM',
      status: 'Confirmed',
      vehicle: 'Honda Civic (MH01AB1234)',
      paymentStatus: 'Paid',
    },
    {
      id: 2,
      service: 'Basic Maintenance',
      customer: 'Jane Smith',
      date: 'May 15, 2023',
      time: '11:30 AM',
      status: 'In Progress',
      vehicle: 'Toyota Fortuner (MH02CD5678)',
      paymentStatus: 'Paid',
    },
    {
      id: 3,
      service: 'Full Service',
      customer: 'Robert Johnson',
      date: 'May 15, 2023',
      time: '02:00 PM',
      status: 'Pending',
      vehicle: 'Hyundai i20 (MH03EF9012)',
      paymentStatus: 'Unpaid',
    },
  ];

  return (
    <DashboardLayout userRole="Admin" userName="Admin User">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Appointments</h2>
              <a
                href="/admin/appointments"
                className="text-sm text-red-600 hover:text-red-800"
              >
                View all
              </a>
            </div>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  actions={
                    <button className="w-full py-2 text-center bg-red-50 text-red-600 rounded hover:bg-red-100">
                      View Details
                    </button>
                  }
                />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/admin/manageservices"
                className="block w-full py-2 bg-red-600 text-white text-center rounded hover:bg-red-700 transition duration-200"
              >
               Manage Services
              </a>
              <a
                href="/admin/users/new"
                className="block w-full py-2 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50 transition duration-200"
              >
                Add New User
              </a>
              <a
                href="/admin/appointments"
                className="block w-full py-2 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50 transition duration-200"
              >
                Manage Appointments
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Services</span>
                <span className="flex items-center text-green-600 text-sm">
                  <ClipboardCheckIcon size={16} className="mr-1" /> Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Booking System</span>
                <span className="flex items-center text-green-600 text-sm">
                  <ClipboardCheckIcon size={16} className="mr-1" /> Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Gateway</span>
                <span className="flex items-center text-green-600 text-sm">
                  <ClipboardCheckIcon size={16} className="mr-1" /> Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Notification System
                </span>
                <span className="flex items-center text-green-600 text-sm">
                  <ClipboardCheckIcon size={16} className="mr-1" /> Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;