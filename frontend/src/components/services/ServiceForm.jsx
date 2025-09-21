import React, { useState } from "react";

const ServiceForm = ({
  onSubmit,
  initialData,
  buttonText = "Add Service",
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    category: initialData?.category || "maintenance",
    image: initialData?.image || "",
    estimatedTime: initialData?.estimatedTime || "",
    includedServices: initialData?.includedServices || [],
  });

  const [includedService, setIncludedService] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  // ✅ Add included service
  const addIncludedService = () => {
    if (includedService.trim()) {
      setFormData({
        ...formData,
        includedServices: [...formData.includedServices, includedService.trim()],
      });
      setIncludedService("");
    }
  };

  // ✅ Remove included service
  const removeIncludedService = (index) => {
    const updatedServices = [...formData.includedServices];
    updatedServices.splice(index, 1);
    setFormData({ ...formData, includedServices: updatedServices });
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Service name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }
    if (!formData.estimatedTime.trim()) {
      newErrors.estimatedTime = "Estimated time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {buttonText === "Add Service" ? "Add New Service" : "Edit Service"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="1"
            className={`w-full bg-white border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="maintenance">Maintenance</option>
            <option value="detailing">Detailing</option>
            <option value="repair">Repair</option>
            <option value="inspection">Inspection</option>
          </select>
        </div>

        {/* Estimated Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Time
          </label>
          <input
            type="text"
            name="estimatedTime"
            value={formData.estimatedTime}
            onChange={handleChange}
            placeholder="e.g., 2 hours"
            className={`w-full bg-white border ${
              errors.estimatedTime ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.estimatedTime && (
            <p className="text-red-500 text-sm mt-1">{errors.estimatedTime}</p>
          )}
        </div>

        {/* Image URL */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image (URL)
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full bg-white border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Included Services */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Included Services
          </label>
          <div className="flex">
            <input
              type="text"
              value={includedService}
              onChange={(e) => setIncludedService(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Add included service"
            />
            <button
              type="button"
              onClick={addIncludedService}
              className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition"
            >
              Add
            </button>
          </div>

          {formData.includedServices.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {formData.includedServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                >
                  <span>{service}</span>
                  <button
                    type="button"
                    onClick={() => removeIncludedService(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              No included services added yet.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
