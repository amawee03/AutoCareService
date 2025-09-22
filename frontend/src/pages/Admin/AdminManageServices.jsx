// AdminManageServices.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PackageIcon,
  ClockIcon,
  DollarSignIcon,
  XIcon,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatsCard from "@/components/dashboards/StatsCard";

export default function AdminManageServices() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [mode, setMode] = useState(null); // "view" or "edit"
  const [imageErrors, setImageErrors] = useState(new Set());
  const [imageLoading, setImageLoading] = useState(new Set());
  const navigate = useNavigate();

  // Image handling functions
  const handleImageError = (serviceId) => {
    console.log(`Image failed to load for service ${serviceId}`);
    setImageErrors(prev => new Set([...prev, serviceId]));
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(serviceId);
      return newSet;
    });
  };

  const handleImageLoad = (serviceId) => {
    console.log(`Image loaded successfully for service ${serviceId}`);
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(serviceId);
      return newSet;
    });
  };

  const handleImageLoadStart = (serviceId) => {
    setImageLoading(prev => new Set([...prev, serviceId]));
  };

  // Function to get the correct image URL for Multer uploads
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    console.log("Original imageUrl:", imageUrl); // Debug log
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      console.log("Full URL detected:", imageUrl);
      return imageUrl;
    }
    
    let finalUrl;
    
    // If it already starts with /uploads/, use as is
    if (imageUrl.startsWith('/uploads/')) {
      finalUrl = `${window.location.origin}${imageUrl}`;
    }
    // If it starts with uploads/ (without leading slash)
    else if (imageUrl.startsWith('uploads/')) {
      finalUrl = `${window.location.origin}/${imageUrl}`;
    }
    // If it's just a filename, prepend /uploads/
    else {
      finalUrl = `${window.location.origin}/uploads/${imageUrl}`;
    }
    
    console.log("Generated URL:", finalUrl); // Debug log
    return finalUrl;
  };

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/packages");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        console.log("Fetched services:", data); // Debug log
        setServices(data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert(err.message);
      }
    };
    fetchServices();
  }, []);

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      setServices((prev) => prev.filter((s) => s.id !== id));
      alert("Service deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Modal controls
  const openModal = (service, modeType) => {
    setSelectedService(service);
    setMode(modeType);
  };
  const closeModal = () => {
    setSelectedService(null);
    setMode(null);
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Check if selectedService and its ID exist
    if (!selectedService || !selectedService.id) {
      alert("Error: No service selected or invalid service ID");
      console.error("Selected service:", selectedService);
      return;
    }

    const formData = new FormData(e.target);
    const updatedData = {
      pkgName: formData.get("pkgName"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      status: formData.get("status"),
    };

    console.log("Updating service ID:", selectedService.id);
    console.log("Update data:", updatedData);

    try {
      const res = await fetch(`/api/packages/${selectedService.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to update service: ${res.status} - ${errorData}`);
      }

      // Update UI state
      setServices((prev) =>
        prev.map((s) =>
          s.id === selectedService.id ? { ...s, ...updatedData } : s
        )
      );
      alert("Service updated successfully!");
      closeModal();
    } catch (err) {
      console.error("Update error:", err);
      alert(`Update failed: ${err.message}`);
    }
  };

  // Stats
  const stats = [
    {
      id: "total-services",
      title: "Total Services",
      value: services.length,
      icon: <PackageIcon size={24} className="text-red-600" />,
    },
    {
      id: "active-services",
      title: "Active Services",
      value: services.filter((s) => s.status === "active").length,
      icon: <EyeIcon size={24} className="text-green-600" />,
    },
    {
      id: "average-price",
      title: "Average Price",
      value:
        services.length > 0
          ? `₹${Math.round(
              services.reduce((sum, s) => sum + Number(s.price), 0) /
                services.length
            ).toLocaleString()}`
          : "₹0",
      icon: <DollarSignIcon size={24} className="text-amber-600" />,
    },
    {
      id: "avg-duration",
      title: "Avg Duration",
      value:
        services.length > 0
          ? `${Math.round(
              services.reduce((sum, s) => sum + Number(s.duration), 0) /
                services.length
            )} min`
          : "0 min",
      icon: <ClockIcon size={24} className="text-blue-600" />,
    },
  ];

  return (
    <DashboardLayout userRole="Admin" userName="Admin User">
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Service List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Service Packages{" "}
            <span className="text-sm text-gray-500">
              ({services.length} total)
            </span>
          </h2>
          <button
            onClick={() => navigate("/admin/services/new")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            + Add New Service
          </button>
        </div>

        <div className="divide-y">
          {services.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">
              No services available.
            </p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                    {service.imageUrl && !imageErrors.has(service.id) ? (
                      <div className="relative w-full h-full">
                        {imageLoading.has(service.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        <img
                          src={getImageUrl(service.imageUrl)}
                          alt={service.pkgName}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(service.id)}
                          onLoad={() => handleImageLoad(service.id)}
                          onLoadStart={() => handleImageLoadStart(service.id)}
                          style={{ 
                            display: imageLoading.has(service.id) ? 'none' : 'block',
                            filter: imageErrors.has(service.id) ? 'grayscale(100%)' : 'none'
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <PackageIcon className="w-6 h-6 mb-1" />
                        {imageErrors.has(service.id) && service.imageUrl && (
                          <span className="text-xs text-red-400">Failed</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.pkgName}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {service.description}
                    </p>
                    <span className="text-xs inline-block px-2 py-1 bg-red-100 text-red-600 rounded-full mt-1">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Middle */}
                <div className="flex items-center gap-8">
                  <p className="font-semibold">₹ {service.price}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon size={16} className="mr-1" />
                    {service.duration}m
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      service.status === "active"
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>

                {/* Right (Actions) */}
                <div className="flex gap-3">
                  <button
                    onClick={() => openModal(service, "view")}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    title="View Details"
                  >
                    <EyeIcon size={18} />
                  </button>
                  <button
                    onClick={() => openModal(service, "edit")}
                    className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                    title="Edit Service"
                  >
                    <PencilIcon size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    title="Delete Service"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {mode === "view" && (
              <div className="p-0">
                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b bg-gradient-to-r from-red-50 to-red-100">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedService.pkgName}
                    </h2>
                    <span className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                      selectedService.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {selectedService.status?.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <XIcon size={24} />
                  </button>
                </div>

                {/* Service Image */}
                <div className="px-6 pt-6">
                  <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-6 relative">
                    {selectedService.imageUrl && !imageErrors.has(selectedService.id) ? (
                      <>
                        {imageLoading.has(selectedService.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        <img
                          src={getImageUrl(selectedService.imageUrl)}
                          alt={selectedService.pkgName}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(selectedService.id)}
                          onLoad={() => handleImageLoad(selectedService.id)}
                          onLoadStart={() => handleImageLoadStart(selectedService.id)}
                          style={{ 
                            display: imageLoading.has(selectedService.id) ? 'none' : 'block'
                          }}
                        />
                        {imageErrors.has(selectedService.id) && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-50 border-2 border-red-200 border-dashed">
                            <div className="text-center">
                              <PackageIcon className="text-red-400 w-16 h-16 mx-auto mb-2" />
                              <p className="text-red-600 font-medium">Image failed to load</p>
                              <p className="text-red-400 text-sm mt-1">URL: {selectedService.imageUrl}</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                        <PackageIcon className="text-gray-400 w-16 h-16 mb-3" />
                        <span className="text-gray-500 font-medium">No image available</span>
                        {selectedService.imageUrl && (
                          <p className="text-gray-400 text-sm mt-2 px-4 text-center break-all">
                            Expected URL: {getImageUrl(selectedService.imageUrl)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Details */}
                <div className="px-6 pb-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {selectedService.description || "No description available"}
                    </p>
                  </div>

                  {/* Key Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <DollarSignIcon className="text-blue-600 w-5 h-5 mr-2" />
                          <span className="font-medium text-gray-900">Price</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          ₹{selectedService.price?.toLocaleString()}
                        </p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <ClockIcon className="text-green-600 w-5 h-5 mr-2" />
                          <span className="font-medium text-gray-900">Duration</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {selectedService.duration} min
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                    <div className="space-y-3">
                      {selectedService.category && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600">Category</span>
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            {selectedService.category}
                          </span>
                        </div>
                      )}
                      
                      {selectedService.id && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600">Service ID</span>
                          <span className="text-gray-800 font-mono text-sm">
                            #{selectedService.id}
                          </span>
                        </div>
                      )}

                      {selectedService.createdAt && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600">Created Date</span>
                          <span className="text-gray-800">
                            {new Date(selectedService.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {selectedService.updatedAt && (
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-gray-600">Last Updated</span>
                          <span className="text-gray-800">
                            {new Date(selectedService.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setMode("edit")}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <PencilIcon size={16} />
                      Edit Service
                    </button>
                  </div>
                </div>
              </div>
            )}

            {mode === "edit" && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Edit {selectedService.pkgName}</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XIcon size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Name
                    </label>
                    <input
                      type="text"
                      name="pkgName"
                      placeholder="Package Name"
                      required
                      defaultValue={selectedService.pkgName}
                      className="w-full bg-white border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Description"
                      required
                      rows="3"
                      defaultValue={selectedService.description}
                      className="w-full bg-white border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={selectedService.price}
                        className="w-full bg-white border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        required
                        name="duration"
                        placeholder="Duration"
                        defaultValue={selectedService.duration}
                        className="w-full bg-white border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={selectedService.status}
                      required
                      className="w-full bg-white border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}