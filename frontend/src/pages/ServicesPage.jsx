import React, { useState } from "react";

export default function AddServicePackageForm() {
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect data and send to backend here
    console.log("Form submitted");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Nw Service Package</h2>
          <button className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Service Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                <option>Detailing</option>
                <option>Maintenance</option>
                <option>Repair</option>
                <option>Bodywork</option>
              </select>
            </div>
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (Rs.)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                min="0"
                defaultValue="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                min="0"
                defaultValue="0"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Service Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Service Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium mb-1">Features</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a feature"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                +
              </button>
            </div>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700">
              {features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Create Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
