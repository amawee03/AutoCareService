// AdminNewService.jsx
import React from "react";
import ServiceForm from "../../components/services/ServiceForm";
import { useNavigate } from "react-router-dom";

export default function AdminNewService() {
  const navigate = useNavigate();

  const handleCreateService = async (formData) => {
    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create service");
      }

      alert("Service created successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Service</h1>
      <ServiceForm onSubmit={handleCreateService} buttonText="Add Service" />
    </div>
  );
}
