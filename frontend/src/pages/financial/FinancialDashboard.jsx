import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StatsCard from '@/components/dashboards/StatsCard';
import {
  DollarSignIcon,
  TrendingUpIcon,
  FileTextIcon,
  CreditCardIcon,
} from 'lucide-react';

export default function FinancialDashboard() {
  // Sample data
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3,25,780',
      icon: <DollarSignIcon size={24} className="text-green-600" />,
      change: {
        value: '8%',
        positive: true,
      },
    },
    {
      title: 'Pending Payments',
      value: '₹42,500',
      icon: <CreditCardIcon size={24} className="text-amber-600" />,
    },
    {
      title: 'Invoices Generated',
      value: 145,
      icon: <FileTextIcon size={24} className="text-blue-600" />,
    },
    {
      title: 'Monthly Growth',
      value: '12%',
      icon: <TrendingUpIcon size={24} className="text-red-600" />,
      change: {
        value: '3%',
        positive: true,
      },
    },
  ];

  const recentPayments = [
    {
      id: 1,
      customer: 'John Doe',
      service: 'Premium Detailing',
      amount: 4999,
      date: 'May 15, 2023',
      status: 'Completed',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      service: 'Basic Maintenance',
      amount: 2999,
      date: 'May 14, 2023',
      status: 'Completed',
    },
    {
      id: 3,
      customer: 'Robert Johnson',
      service: 'Full Service',
      amount: 7999,
      date: 'May 13, 2023',
      status: 'Pending',
    },
    {
      id: 4,
      customer: 'Emily Brown',
      service: 'Brake Service',
      amount: 3499,
      date: 'May 12, 2023',
      status: 'Completed',
    },
    {
      id: 5,
      customer: 'Michael Wilson',
      service: 'Interior Restoration',
      amount: 5999,
      date: 'May 11, 2023',
      status: 'Completed',
    },
  ];

  const pendingInvoices = [
    {
      id: 101,
      customer: 'Robert Johnson',
      service: 'Full Service',
      amount: 7999,
      date: 'May 13, 2023',
    },
    {
      id: 102,
      customer: 'William Davis',
      service: 'Premium Detailing',
      amount: 4999,
      date: 'May 10, 2023',
    },
    {
      id: 103,
      customer: 'Olivia Martin',
      service: 'Basic Maintenance',
      amount: 2999,
      date: 'May 09, 2023',
    },
  ];

  return (
    <DashboardLayout userRole="Financial Manager" userName="Finance Manager">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>

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
              <h2 className="text-lg font-semibold">Recent Payments</h2>
              <a
                href="/financial/payments"
                className="text-sm text-red-600 hover:text-red-800"
              >
                View all
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pending Invoices</h2>
              <a
                href="/financial/invoices"
                className="text-sm text-red-600 hover:text-red-800"
              >
                View all
              </a>
            </div>

            <div className="space-y-4">
              {pendingInvoices.map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{invoice.customer}</span>
                    <span className="text-gray-600 text-sm">{invoice.date}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{invoice.service}</div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">₹{invoice.amount}</span>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Generate Invoice
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
                href="/financial/invoices/new"
                className="block w-full py-2 bg-red-600 text-white text-center rounded hover:bg-red-700 transition duration-200"
              >
                Create New Invoice
              </a>
              <a
                href="/financial/reports"
                className="block w-full py-2 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50 transition duration-200"
              >
                Generate Report
              </a>
              <a
                href="/financial/payments/pending"
                className="block w-full py-2 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50 transition duration-200"
              >
                View Pending Payments
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
