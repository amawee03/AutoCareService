import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Car, Wrench, Zap } from "lucide-react";
import axios from "axios";

const API = "http://localhost:5001/api/packages"; // ✅ Adjust to your backend

const AdminViewPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const categories = ["All", "Maintenance", "Full Service", "Brakes", "Tires", "Electrical"];

  // ✅ Fetch all packages
  const fetchPackages = async () => {
    try {
      const { data } = await axios.get(API);
      setPackages(data);
      setFilteredPackages(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // ✅ Filter whenever search/category changes
  useEffect(() => {
    let filtered = packages;
    if (searchTerm) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.pkgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((pkg) => pkg.category === selectedCategory);
    }
    setFilteredPackages(filtered);
  }, [searchTerm, selectedCategory, packages]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Limited":
        return "bg-yellow-100 text-yellow-800";
      case "Unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Maintenance":
        return <Wrench className="w-4 h-4" />;
      case "Electrical":
        return <Zap className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  const handleView = (pkg) => {
    setSelectedPackage(pkg);
    setShowViewModal(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage({ ...pkg });
    setShowEditModal(true);
    setNewImage(null);
  };

  // ✅ Delete package
  const handleDelete = async (id) => {
  console.log("Deleting ID:", id); // should print a real ObjectId
  if (!id) return; // optional guard
  try {
    await axios.delete(`http://localhost:5001/api/packages/${id}`);
    fetchServices();
  } catch (error) {
    console.error("Error deleting service:", error);
  }
};


  // ✅ Update package with optional new image
  const handleUpdatePackage = async () => {
    if (!editingPackage || !editingPackage._id) return;
    try {
      const fd = new FormData();
      fd.append("pkgName", editingPackage.pkgName);
      fd.append("category", editingPackage.category);
      fd.append("description", editingPackage.description);
      fd.append("price", editingPackage.price);
      fd.append("duration", editingPackage.duration || "");
      fd.append("availability", editingPackage.availability || "Available");
      fd.append("features", JSON.stringify(editingPackage.features || []));
      if (newImage) fd.append("image", newImage);

      await axios.put(`${API}/${editingPackage._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowEditModal(false);
      setEditingPackage(null);
      await fetchPackages();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update service");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* search + filter */}
      <div className="bg-white p-4 rounded mb-6 flex gap-4">
        <input
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Search packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Item ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-xs break-all">{pkg._id}</td>
                <td className="p-3">
                  {pkg.image && (
                    <img
                      src={`http://localhost:5001${pkg.image}`}
                      alt=""
                      className="h-16 w-24 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-3">{pkg.pkgName}</td>
                <td className="p-3 flex items-center gap-1">
                  {getCategoryIcon(pkg.category)}
                  {pkg.category}
                </td>
                <td className="p-3">${pkg.price}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusColor(
                      pkg.availability
                    )}`}
                  >
                    {pkg.availability}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleView(pkg)}
                    className="text-blue-600"
                  >
                    <Eye />
                  </button>
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="text-green-600"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {showViewModal && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">{selectedPackage.pkgName}</h2>
            <p className="mb-2 text-sm text-gray-600">
              <b>Item ID:</b> {selectedPackage._id}
            </p>
            {selectedPackage.image && (
              <img
                src={`http://localhost:5001${selectedPackage.image}`}
                alt=""
                className="mb-4 rounded"
              />
            )}
            <p className="mb-2">
              <b>Category:</b> {selectedPackage.category}
            </p>
            <p className="mb-2">
              <b>Description:</b> {selectedPackage.description}
            </p>
            <p className="mb-2">
              <b>Price:</b> ${selectedPackage.price}
            </p>
            <p className="mb-2">
              <b>Features:</b>{" "}
              {(selectedPackage.features || []).join(", ")}
            </p>
            <button
              onClick={() => setShowViewModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Edit Package</h2>
            <p className="text-sm text-gray-600 mb-2">
              Item ID: {editingPackage._id}
            </p>
            <input
              className="border p-2 w-full mb-2"
              value={editingPackage.pkgName}
              onChange={(e) =>
                setEditingPackage({
                  ...editingPackage,
                  pkgName: e.target.value,
                })
              }
            />
            <textarea
              className="border p-2 w-full mb-2"
              value={editingPackage.description}
              onChange={(e) =>
                setEditingPackage({
                  ...editingPackage,
                  description: e.target.value,
                })
              }
            />
            <input
              type="number"
              className="border p-2 w-full mb-2"
              value={editingPackage.price}
              onChange={(e) =>
                setEditingPackage({
                  ...editingPackage,
                  price: e.target.value,
                })
              }
            />
            {editingPackage.image && (
              <img
                src={`http://localhost:5001${editingPackage.image}`}
                alt=""
                className="mb-2 h-24 object-cover"
              />
            )}
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePackage}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Saveeeeeeee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewPackages;