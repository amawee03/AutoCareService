import React, { useState } from 'react';

export default function AddVehicleModal({ isOpen, onClose, onSave }) {
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
    color: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(vehicleData);
    setVehicleData({
      make: '',
      model: '',
      year: '',
      registrationNumber: '',
      color: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-bold">Add New Vehicle</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Make</label>
              <input
                type="text"
                name="make"
                value={vehicleData.make}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={vehicleData.model}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={vehicleData.year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={vehicleData.color}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={vehicleData.registrationNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
