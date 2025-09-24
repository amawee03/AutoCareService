// AdminAddServiceForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PackageIcon,
  ImageIcon,
  TagIcon,
  ClockIcon,
  DollarSignIcon,
  PlusIcon,
  XIcon,
  CheckCircleIcon,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function AdminAddServiceForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Dynamic array states
  const [features, setFeatures] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [includedServices, setIncludedServices] = useState([""]);

  // Form data state
  const [formData, setFormData] = useState({
    pkgName: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    status: "active",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Dynamic array handlers
  const addArrayItem = (setter, array) => setter([...array, ""]);
  const removeArrayItem = (setter, array, index) =>
    array.length > 1 && setter(array.filter((_, i) => i !== index));
  const updateArrayItem = (setter, array, index, value) => {
    const updated = [...array];
    updated[index] = value;
    setter(updated);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Add simple form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Add arrays as JSON strings
      submitData.append(
        "features",
        JSON.stringify(features.filter((f) => f.trim() !== ""))
      );
      submitData.append(
        "tags",
        JSON.stringify(tags.filter((t) => t.trim() !== ""))
      );
      submitData.append(
        "includedServices",
        JSON.stringify(includedServices.filter((s) => s.trim() !== ""))
      );

      // Add image file
      if (selectedFile) submitData.append("image", selectedFile);

      // Call backend endpoint
      const response = await fetch("/api/packages", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create service package");
      }

      alert("Service package created successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userRole="Admin" userName="Admin User">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Service Package
            </h1>
            <p className="text-gray-600 mt-2">
              Create a comprehensive service package for your clients
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/services")}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Services
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <PackageIcon className="text-red-600 w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Basic Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Name *
                </label>
                <input
                  type="text"
                  name="pkgName"
                  value={formData.pkgName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Premium Hair Care Package"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Detailed description..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a category</option>
                  <option value="Hair Care">Hair Care</option>
                  <option value="Skin Care">Skin Care</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Facial Treatments">Facial Treatments</option>
                  <option value="Body Treatments">Body Treatments</option>
                  <option value="Massage Therapy">Massage Therapy</option>
                  <option value="Bridal Packages">Bridal Packages</option>
                  <option value="Men's Grooming">Men's Grooming</option>
                  <option value="Wellness">Wellness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSignIcon className="inline w-4 h-4 mr-1" />
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="1999.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ClockIcon className="inline w-4 h-4 mr-1" />
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  min="1"
                  placeholder="120"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <ImageIcon className="text-red-600 w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Service Image</h2>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 transition-colors"
            />
            {imagePreview && (
              <div className="relative inline-block mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setSelectedFile(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <XIcon size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Features, Tags, Included Services */}
          {[{ state: features, setter: setFeatures, label: "Package Features" },
            { state: tags, setter: setTags, label: "Tags" },
            { state: includedServices, setter: setIncludedServices, label: "Included Services" }].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <CheckCircleIcon className="text-red-600 w-6 h-6 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">{item.label}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => addArrayItem(item.setter, item.state)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <PlusIcon size={16} /> Add
                </button>
              </div>
              <div className="space-y-3">
                {item.state.map((val, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => updateArrayItem(item.setter, item.state, i, e.target.value)}
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    />
                    {item.state.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(item.setter, item.state, i)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <XIcon size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit */}
          <div className="flex items-center justify-end gap-4 py-6">
            <button
              type="button"
              onClick={() => navigate("/admin/services")}
              className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 transition-colors flex items-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? "Creating..." : "Create Service Package"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
