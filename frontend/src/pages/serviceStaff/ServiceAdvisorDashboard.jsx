import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StatsCard from '@/components/dashboards/StatsCard';
import AppointmentCard from '@/components/appointments/AppointmnetCard';
import {
  CalendarIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
} from 'lucide-react';

export default function ServiceAdvisorDashboard() {
  const [dateFilter, setDateFilter] = useState('today');

  // Sample data
  const stats = [
    {
      title: "Today's Appointments",
      value: 8,
      icon: <CalendarIcon size={24} className="text-blue-600" />,
    },
    {
      title: 'Total Customers',
      value: 573,
      icon: <UsersIcon size={24} className="text-green-600" />,
    },
    {
      title: 'Completed Today',
      value: 3,
      icon: <CheckCircleIcon size={24} className="text-amber-600" />,
    },
    {
      title: 'In Progress',
      value: 4,
      icon: <ClockIcon size={24} className="text-red-600" />,
    },
  ];

  const appointments = [
    {
      id: 1,
      service: 'Premium Detailing',
      customer: 'John Doe',
      date: 'May 15, 2023',
      time: '10:00 AM',
      status: 'Confirmed',
      vehicle: 'Honda Civic (MH01AB1234)',
    },
    {
      id: 2,
      service: 'Basic Maintenance',
      customer: 'Jane Smith',
      date: 'May 15, 2023',
      time: '11:30 AM',
      status: 'In Progress',
      vehicle: 'Toyota Fortuner (MH02CD5678)',
    },
    {
      id: 3,
      service: 'Full Service',
      customer: 'Robert Johnson',
      date: 'May 15, 2023',
      time: '02:00 PM',
      status: 'Pending',
      vehicle: 'Hyundai i20 (MH03EF9012)',
    },
    {
      id: 4,
      service: 'Brake Service',
      customer: 'Emily Brown',
      date: 'May 16, 2023',
      time: '09:30 AM',
      status: 'Confirmed',
      vehicle: 'Maruti Swift (MH04GH3456)',
    },
    {
      id: 5,
      service: 'Express Wash & Wax',
      customer: 'Michael Wilson',
      date: 'May 16, 2023',
      time: '12:00 PM',
      status: 'Confirmed',
      vehicle: 'Kia Seltos (MH05IJ7890)',
    },
    {
      id: 6,
      service: 'Interior Restoration',
      customer: 'David Thompson',
      date: 'May 16, 2023',
      time: '03:00 PM',
      status: 'Confirmed',
      vehicle: 'Honda City (MH06KL1234)',
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    if (dateFilter === 'today') return appointment.date === 'May 15, 2023';
    if (dateFilter === 'tomorrow') return appointment.date === 'May 16, 2023';
    return true;
  });

  const customerRequests = [
    {
      id: 101,
      customer: 'Sarah Parker',
      request: 'Requesting early appointment for AC service',
      time: '10 mins ago',
    },
    {
      id: 102,
      customer: 'James Wilson',
      request: 'Asking about additional wheel alignment cost',
      time: '1 hour ago',
    },
    {
      id: 103,
      customer: 'Emma Davis',
      request: "Need to reschedule tomorrow's appointment",
      time: '3 hours ago',
    },
  ];

  return (
    <DashboardLayout userRole="Service Advisor" userName="Service Advisor">
      <h1 className="text-2xl font-bold mb-6">Service Advisor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-lg font-semibold">Appointments</h2>
              <div className="mt-3 sm:mt-0">
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => setDateFilter('today')}
                    className={`px-4 py-2 text-sm font-medium border ${dateFilter === 'today' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} rounded-l-md`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setDateFilter('tomorrow')}
                    className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${dateFilter === 'tomorrow' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    Tomorrow
                  </button>
                  <button
                    onClick={() => setDateFilter('all')}
                    className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${dateFilter === 'all' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} rounded-r-md`}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    actions={
                      <div className="flex w-full space-x-2">
                        <button className="flex-1 py-2 text-center bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                          Update Status
                        </button>
                        <button className="flex-1 py-2 text-center bg-red-50 text-red-600 rounded hover:bg-red-100">
                          Contact Customer
                        </button>
                      </div>
                    }
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No appointments found for the selected date.
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Customer Requests</h2>
              <a
                href="/service-advisor/requests"
                className="text-sm text-red-600 hover:text-red-800"
              >
                View all
              </a>
            </div>

            <div className="space-y-4">
              {customerRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{request.customer}</span>
                    <span className="text-xs text-gray-500">{request.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{request.request}</p>
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Reply
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      Mark as Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/service-advisor/schedule"
                className="block w-full py-2 bg-red-600 text-white text-center rounded hover:bg-red-700 transition duration-200"
              >
                Schedule Appointment
              </a>
              <a
                href="/service-advisor/customers"
                className="block w-full py-2 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50 transition duration-200"
              >
                View Customers
              </a>
              <a
                href="/service-advisor/reports"
                className="block w-full py-2 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50 transition duration-200"
              >
                Generate Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
