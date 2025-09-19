import React, { useState } from 'react';

const ServiceForm = ({
  onSubmit,
  initialData,
  buttonText = 'Add Service',
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    category: initialData?.category || 'maintenance',
    image: initialData?.image || '',
    estimatedTime: initialData?.estimatedTime || '',
    includedServices: initialData?.includedServices || [],
  });

  const [includedService, setIncludedService] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const addIncludedService = () => {
    if (includedService.trim()) {
      setFormData({
        ...formData,
        includedServices: [
          ...(formData.includedServices || []),
          includedService.trim(),
        ],
      });
      setIncludedService('');
    }
  };

  const removeIncludedService = (index) => {
    const updatedServices = [...(formData.includedServices || [])];
    updatedServices.splice(index, 1);
    setFormData({
      ...formData,
      includedServices: updatedServices,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    if (!formData.estimatedTime?.trim()) {
      newErrors.estimatedTime = 'Estimated time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className={`w-full border ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">{errors.price}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="maintenance">Maintenance</option>
            <option value="detailing">Detailing</option>
            <option value="repair">Repair</option>
            <option value="inspection">Inspection</option>
          </select>
        </div>

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
            className={`w-full border ${
              errors.estimatedTime ? 'border-red-500' : 'border-gray-300'
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.estimatedTime && (
            <p className="mt-1 text-xs text-red-500">{errors.estimatedTime}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full border ${
              errors.image ? 'border-red-500' : 'border-gray-300'
            } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Included Services
          </label>
          <div className="flex">
            <input
              type="text"
              value={includedService}
              onChange={(e) => setIncludedService(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Add included service"
            />
            <button
              type="button"
              onClick={addIncludedService}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>
          {formData.includedServices && formData.includedServices.length > 0 ? (
            <ul className="mt-3 space-y-1">
              {formData.includedServices.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                >
                  <span>{service}</span>
                  <button
                    type="button"
                    onClick={() => removeIncludedService(index)}
                    className="text-red-500 hover:text-red-700"
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
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;