// frontend/src/pages/financial/ReportsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("income");
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter UI state
  const [filterType, setFilterType] = useState("all"); 
  const [globalSearch, setGlobalSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  // Fetch income records once
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/api/finance-income");
        setIncomeData(res.data || []);
      } catch (err) {
        console.error("Error fetching income data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  // Derived list of categories for dropdown
  const categories = useMemo(() => {
    const set = new Set();
    incomeData.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return Array.from(set);
  }, [incomeData]);

  // Apply filters
  const filteredData = useMemo(() => {
    if (!incomeData) return [];

    const lowerGlobal = globalSearch.trim().toLowerCase();

    return incomeData.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const cat = (item.category || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const amount = Number(item.amount || 0);
      const itemDate = item.dateReceived ? new Date(item.dateReceived) : null;

      if (filterType === "all") {
        if (!lowerGlobal) return true;
        return (
          name.includes(lowerGlobal) ||
          cat.includes(lowerGlobal) ||
          desc.includes(lowerGlobal) ||
          String(amount).includes(lowerGlobal)
        );
      }

      if (filterType === "name") {
        return name.includes(nameSearch.trim().toLowerCase());
      }

      if (filterType === "category") {
        if (!categorySearch) return true;
        return cat === categorySearch.toLowerCase();
      }

      if (filterType === "amount") {
        const min = minAmount === "" ? -Infinity : Number(minAmount);
        const max = maxAmount === "" ? Infinity : Number(maxAmount);
        if (Number.isNaN(min) || Number.isNaN(max)) return false;
        return amount >= min && amount <= max;
      }

      if (filterType === "date") {
        if (!dateFrom && !dateTo) return true;
        if (!itemDate) return false;
        const start = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : -Infinity;
        const end = dateTo ? new Date(dateTo).setHours(23, 59, 59, 999) : Infinity;
        const d = itemDate.getTime();
        return d >= start && d <= end;
      }

      return true;
    });
  }, [
    incomeData,
    filterType,
    globalSearch,
    nameSearch,
    categorySearch,
    minAmount,
    maxAmount,
    dateFrom,
    dateTo,
  ]);

  // Delete record

  const handleDelete = async (id) => {
  const deletePin = prompt("Enter PIN for deletion:");
  if (!deletePin) return;

  const deleteReason = prompt("Enter reason to confirm deletion:");
  if (!deleteReason) return;

  try {
    const res = await axios.delete(
      `http://localhost:5001/api/finance-income/${id}`,
      { data: { deleteReason, deletePin } }
    );
    alert(res.data.message);
    setIncomeData((prev) => prev.filter((i) => i._id !== id));
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Deletion failed. Check console.");
  }
};




  // Edit record
  const handleEdit = (record) => {
    const newName = window.prompt("Quick edit customer name:", record.name);
    if (!newName || newName.trim() === record.name) return;

    axios
      .put(`http://localhost:5001/api/finance-income/${record._id}`, { name: newName.trim() })
      .then((res) => {
        setIncomeData((prev) => prev.map((i) => (i._id === record._id ? res.data : i)));
        alert("Updated successfully.");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Update failed. Check console.");
      });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterType("all");
    setGlobalSearch("");
    setNameSearch("");
    setCategorySearch("");
    setMinAmount("");
    setMaxAmount("");
    setDateFrom(null);
    setDateTo(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Reports</h2>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "income" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "expenses" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("expenses")}
        >
          Expenses
        </button>
      </div>

      {activeTab === "income" && (
        <>
          {/* Filter Panel */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by</label>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 bg-white text-black focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All (global)</option>
                  <option value="name">Name</option>
                  <option value="category">Category / Type</option>
                  <option value="amount">Amount range</option>
                  <option value="date">Date range</option>
                </select>

                {/* Conditional inputs */}
                {filterType === "all" && (
                  <input
                    type="text"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    placeholder="Search name, category, notes or amount..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 bg-white text-black placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                )}

                {filterType === "name" && (
                  <input
                    type="text"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    placeholder="Search by customer name..."
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 bg-white text-black placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                  />
                )}

                {filterType === "category" && (
                  <select
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 bg-white text-black focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}

                {filterType === "amount" && (
                  <>
                    <input
                      type="number"
                      min="0"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Min amount"
                      className="w-32 rounded-lg border border-gray-300 px-3 py-2 bg-white text-black placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                    />
                    <input
                      type="number"
                      min="0"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Max amount"
                      className="w-32 rounded-lg border border-gray-300 px-3 py-2 bg-white text-black placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                    />
                  </>
                )}

                {filterType === "date" && (
                  <>
                    <DatePicker
                      selected={dateFrom}
                      onChange={(date) => setDateFrom(date)}
                      maxDate={new Date()}
                      placeholderText="From"
                      className="rounded-lg border border-gray-300 px-3 py-2 bg-white text-black focus:ring-red-500 focus:border-red-500"
                    />
                    <DatePicker
                      selected={dateTo}
                      onChange={(date) => setDateTo(date)}
                      maxDate={new Date()}
                      placeholderText="To"
                      className="rounded-lg border border-gray-300 px-3 py-2 bg-white text-black focus:ring-red-500 focus:border-red-500"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Apply
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-gray-600">Loading data...</p>
            ) : filteredData.length === 0 ? (
              <p className="text-gray-500">No income records found.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-200 min-w-[900px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Customer</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Category</th>
                    <th className="border border-gray-200 px-4 py-2 text-right">Amount (Rs.)</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Mode</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Notes</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
                    <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 align-top">
                        {item.dateReceived ? new Date(item.dateReceived).toLocaleDateString() : "-"}
                      </td>
                      <td className="border px-4 py-2 align-top">{item.name}</td>
                      <td className="border px-4 py-2 align-top">{item.category}</td>
                      <td className="border px-4 py-2 text-right align-top">{Number(item.amount).toFixed(2)}</td>
                      <td className="border px-4 py-2 align-top">{item.mode}</td>
                      <td className="border px-4 py-2 align-top">{item.description || "-"}</td>
                      <td className="border px-4 py-2 align-top">
                        {item.image ? (
                          <a
                            href={`http://localhost:5001${item.image}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="border px-4 py-2 text-center align-top">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {activeTab === "expenses" && (
        <p className="text-gray-500">Expenses reporting coming soon...</p>
      )}
    </div>
  );
}
