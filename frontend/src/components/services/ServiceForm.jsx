import React, { useState } from "react";

const ServiceForm = ({ onSubmit, initialData, buttonText = "Add Service" }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    category: initialData?.category || "maintenance",
    estimatedTime: initialData?.estimatedTime || "",
    includedServices: initialData?.includedServices || [],
    features: initialData?.features || [],
    tags: initialData?.tags || [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [includedService, setIncludedService] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Add/remove included services
  const addIncludedService = () => {
    const trimmed = includedService.trim();
    if (!trimmed) return;
    setFormData((prev) => ({
      ...prev,
      includedServices: [...prev.includedServices, trimmed],
    }));
    setIncludedService("");
  };

  const removeIncludedService = (index) => {
    setFormData((prev) => {
      const updated = [...prev.includedServices];
      updated.splice(index, 1);
      return { ...prev, includedServices: updated };
    });
  };

  // Add/remove features and tags
  const addChip = (value, key) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], trimmed],
    }));
    if (key === "features") setFeatureInput("");
    if (key === "tags") setTagInput("");
  };

  const removeChip = (index, key) => {
    setFormData((prev) => {
      const updated = [...prev[key]];
      updated.splice(index, 1);
      return { ...prev, [key]: updated };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Service name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!imageFile) newErrors.image = "Please select an image";
    if (!formData.estimatedTime.trim()) newErrors.estimatedTime = "Estimated time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const data = new FormData();

  // Map frontend fields to backend expected fields
  data.append("pkgName", formData.name);             // name -> pkgName
  data.append("description", formData.description);
  data.append("category", formData.category);
  data.append("price", formData.price);
  data.append("duration", formData.estimatedTime);   // estimatedTime -> duration

  // Arrays
  formData.includedServices.forEach((s) => data.append("includedServices[]", s));
  formData.features.forEach((f) => data.append("features[]", f));
  formData.tags.forEach((t) => data.append("tags[]", t));

  // Image
  if (imageFile) data.append("image", imageFile);

  onSubmit(data);
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold mb-6">{buttonText}</h2>

      {/* Service Name */}
      <label className="block mb-1">Service Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={`w-full bg-white border ${
          errors.name ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      {/* Price */}
      <label className="block mt-4 mb-1">Price (₹)</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className={`w-full bg-white border ${
          errors.price ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2`}
      />
      {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

      {/* Category */}
      <label className="block mt-4 mb-1">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="maintenance">Maintenance</option>
        <option value="detailing">Detailing</option>
        <option value="repair">Repair</option>
        <option value="inspection">Inspection</option>
        <option value="bodywork">Bodywork</option>
      </select>

      {/* Estimated Time */}
      <label className="block mt-4 mb-1">Estimated Time</label>
      <input
        type="text"
        name="estimatedTime"
        value={formData.estimatedTime}
        onChange={handleChange}
        placeholder="e.g., 2 hours"
        className={`w-full bg-white border ${
          errors.estimatedTime ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2`}
      />
      {errors.estimatedTime && <p className="text-red-500 text-sm">{errors.estimatedTime}</p>}

      {/* Image */}
      <label className="block mt-4 mb-1">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={`w-full bg-white border ${
          errors.image ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2`}
      />
      {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

      {/* Description */}
      <label className="block mt-4 mb-1">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        className={`w-full bg-white border ${
          errors.description ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2`}
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

      {/* Included Services */}
      <label className="block mt-4 mb-1">Included Services</label>
      <div className="flex">
        <input
          type="text"
          value={includedService}
          onChange={(e) => setIncludedService(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-l-lg px-3 py-2"
          placeholder="Add included service"
        />
        <button
          type="button"
          onClick={addIncludedService}
          className="bg-red-600 text-white px-4 py-2 rounded-r-lg"
        >
          Add
        </button>
      </div>
      {formData.includedServices.length > 0 && (
        <ul className="mt-3 space-y-2">
          {formData.includedServices.map((service, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-50 px-3 py-2 rounded-lg"
            >
              <span>{service}</span>
              <button
                type="button"
                onClick={() => removeIncludedService(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Features */}
      <label className="block mt-4 mb-1">Features</label>
      <div className="flex gap-3">
        <input
          value={featureInput}
          onChange={(e) => setFeatureInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addChip(featureInput, "features"))
          }
          placeholder="Add feature"
          className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          type="button"
          onClick={() => addChip(featureInput, "features")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.features.map((f, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
          >
            {f}
            <button type="button" onClick={() => removeChip(i, "features")} className="text-red-500">
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Tags */}
      <label className="block mt-4 mb-1">Tags</label>
      <div className="flex gap-3">
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addChip(tagInput, "tags"))
          }
          placeholder="Add tag"
          className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          type="button"
          onClick={() => addChip(tagInput, "tags")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.tags.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
          >
            {t}
            <button type="button" onClick={() => removeChip(i, "tags")} className="text-red-500">
              ×
            </button>
          </span>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default ServiceForm;
