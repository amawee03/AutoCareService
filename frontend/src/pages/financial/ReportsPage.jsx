// src/pages/financial/ReportsPage.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function ReportsPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/api/finance-incomes")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <DashboardLayout userRole="Financial Manager" userName="Finance Manager">
      <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>

      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.dateReceived?.slice(0, 10)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.category}</td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">{invoice.mode}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{invoice.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{invoice.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
