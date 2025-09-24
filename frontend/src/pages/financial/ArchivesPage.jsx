// frontend/src/pages/financial/ArchivesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ArchivesPage() {
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/finance-archives");
        setArchives(res.data);   // <-- update state here
      } catch (err) {
        console.error("Error fetching archives:", err);
      }
    };
    fetchArchives();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Archived Records</h2>

      {archives.length === 0 ? (
        <p className="text-gray-500">No archived records found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-right">Amount (Rs.)</th>
              <th className="border px-4 py-2 text-left">Reason</th>
              <th className="border px-4 py-2 text-left">Deleted At</th>
            </tr>
          </thead>
          <tbody>
            {archives.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{new Date(a.dateReceived).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{a.name}</td>
                <td className="border px-4 py-2">{a.category}</td>
                <td className="border px-4 py-2 text-right">{a.amount.toFixed(2)}</td>
                <td className="border px-4 py-2 text-red-600">{a.deleteReason}</td>
                <td className="border px-4 py-2">{new Date(a.deletedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
