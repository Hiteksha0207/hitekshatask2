import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const FormSection = ({ formData, setFormData }) => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("spa_name", formData.spa_name);
    payload.append("city", formData.city);
    payload.append("area", formData.area);
    payload.append("price", formData.price);
    let timingStr = formData.timing;
    if (timingStr && timingStr.length === 5) timingStr += ":00";
    payload.append("timing", timingStr);

    formData.images.forEach((img) => {
      payload.append("images", img);
    });

    try {
      const response = await fetch("/api/spas/vendor-spa-update-test/1/", {
        method: "PUT",
        body: payload,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Form submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        console.error("Submit error:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-white p-6 rounded-xl shadow-lg max-w-full overflow-y-auto space-y-6"
    >
      {successMessage && (
        <div className="p-4 text-green-800 bg-green-100 border border-green-300 rounded-md animate-pulse text-center font-semibold">
          {successMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold text-purple-800 text-center">🧖 Spa Details Form</h2>

      {[
        { name: "spa_name", label: "Spa Name", placeholder: "Enter spa name" },
        { name: "area", label: "Area", placeholder: "Enter area" },
        { name: "city", label: "City", placeholder: "Enter city" },
      ].map(({ name, label, placeholder }) => (
        <div key={name} className="mb-3">
          <label htmlFor={name} className="block font-medium text-gray-700">
            {label}
          </label>
          <input
            type="text"
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
            placeholder={placeholder}
            className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>
      ))}

      {/* Price */}
      <div className="mb-3">
        <label htmlFor="price" className="block font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Enter price"
          className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      {/* Timing */}
      <div className="mb-3">
        <label htmlFor="timing" className="block font-medium text-gray-700">
          Timing
        </label>
        <input
          type="time"
          id="timing"
          name="timing"
          value={formData.timing}
          onChange={handleChange}
          required
          step="60"
          className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />
      </div>

      {/* Images */}
      <div className="mb-3">
        <label htmlFor="images" className="block font-medium text-gray-700 mb-1">
          Upload Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleChange}
          accept="image/*"
          className="block w-full"
        />

        {/* Thumbnails with remove button */}
        {formData.images?.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`upload-${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-[#b092ca] to-[#714f7e]  hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        🚀 Submit Spa Details
      </button>
    </form>
  );
};

export default FormSection;
