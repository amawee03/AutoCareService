import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import {
  PackageIcon,
  AlertTriangleIcon,
  TruckIcon,
  ArchiveIcon,
} from 'lucide-react';

export default function InventoryDashboard() {
  // Sample data
  const stats = [
    {
      title: 'Total Items',
      value: 248,
      icon: <PackageIcon size={24} className="text-blue-600" />,
    },
    {
      title: 'Low Stock Items',
      value: 12,
      icon: <AlertTriangleIcon size={24} className="text-amber-600" />,
    },
    {
      title: 'Pending Orders',
      value: 5,
      icon: <TruckIcon size={24} className="text-green-600" />,
    },
    {
      title: 'Categories',
      value: 8,
      icon: <ArchiveIcon size={24} className="text-red-600" />,
    },
  ];

  const lowStockItems = [
    {
      id: 1,
      name: 'Engine Oil (5W-30)',
      category: 'Oils',
      currentStock: 5,
      minRequired: 10,
    },
    {
      id: 2,
      name: 'Oil Filter',
      category: 'Filters',
      currentStock: 8,
      minRequired: 15,
    },
    {
      id: 3,
      name: 'Brake Pads',
      category: 'Brakes',
      currentStock: 4,
      minRequired: 10,
    },
    {
      id: 4,
      name: 'Wiper Blades',
      category: 'Accessories',
      currentStock: 6,
      minRequired: 12,
    },
  ];

  const recentTransactions = [
    {
      id: 101,
      item: 'Engine Oil (5W-30)',
      quantity: 20,
      type: 'Inward',
      date: 'May 14, 2023',
    },
    {
      id: 102,
      item: 'Air Filter',
      quantity: 15,
      type: 'Inward',
      date: 'May 13, 2023',
    },
    {
      id: 103,
      item: 'Engine Oil (5W-30)',
      quantity: 5,
      type: 'Outward',
      date: 'May 12, 2023',
    },
    {
      id: 104,
      item: 'Brake Fluid',
      quantity: 10,
      type: 'Inward',
      date: 'May 11, 2023',
    },
    {
      id: 105,
      item: 'Oil Filter',
      quantity: 8,
      type: 'Outward',
      date: 'May 10, 2023',
    },
  ];

  return (
    <DashboardLayout userRole="Inventory Manager" userName="Inventory Manager">
      <h1 className="text-2xl font-bold mb-6">Inventory Dashboard</h1>

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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <a
                href="/inventory/transactions"
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
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.type === 'Inward'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {transaction.type}
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
              <h2 className="text-lg font-semibold">Low Stock Items</h2>
              <a
                href="/inventory/low-stock"
                className="text-sm text-red-600 hover:text-red-800"
              >
                View all
              </a>
            </div>

            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                      Low Stock
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Category: {item.category}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600">Current: </span>
                      <span className="font-bold text-gray-900">{item.currentStock}</span>
                      <span className="text-sm text-gray-600 ml-2">Min: </span>
                      <span className="font-bold text-gray-900">{item.minRequired}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Order Now
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
                href="/inventory/add"
                className="block w-full py-2 bg-red-600 text-white text-center rounded hover:bg-red-700 transition duration-200"
              >
                Add Inventory
              </a>
              <a
                href="/inventory/order"
                className="block w-full py-2 border border-gray-300 text-gray-700 text-center rounded hover:bg-gray-50 transition duration-200"
              >
                Place New Order
              </a>
              <a
                href="/inventory/report"
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
