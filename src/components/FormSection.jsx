import React, { useState } from 'react';

const FormSection = ({ formData, setFormData }) => {
  const [successMessage, setSuccessMessage] = useState('');

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'images') {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('spa_name', formData.spa_name);
    payload.append('city', formData.city);
    payload.append('area', formData.area);
    payload.append('price', formData.price);

    let timingStr = formData.timing;
    if (timingStr && timingStr.length === 5) {
      timingStr += ':00';
    }
    payload.append('timing', timingStr);

    formData.images.forEach((img) => {
      payload.append('images', img);
    });

    try {
      const response = await fetch(
        'http://20.193.149.47:2242/spas/vendor-spa-update-test/1/',
        {
          method: 'PUT',
          body: payload,
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log('Submitted successfully:', result);
        setSuccessMessage('Form submitted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Submit error:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-white p-4 rounded shadow-md max-w-full overflow-y-auto"
    >
      {successMessage && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
        Spa Details Form
      </h2>

      {/* Spa Name */}
      <div className="mb-3">
        <label htmlFor="spa_name" className="block mb-2 text-gray-700 font-medium">
          Spa Name
        </label>
        <input
          type="text"
          id="spa_name"
          name="spa_name"
          value={formData.spa_name}
          onChange={handleChange}
          required
          placeholder="Enter spa name"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
        />
      </div>

      {/* City */}
      <div className="mb-3">
        <label htmlFor="city" className="block mb-2 text-gray-700 font-medium">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          placeholder="Enter city"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
        />
      </div>

      {/* Area */}
      <div className="mb-3">
        <label htmlFor="area" className="block mb-2 text-gray-700 font-medium">
          Area
        </label>
        <input
          type="text"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
          placeholder="Enter area"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
        />
      </div>

      {/* Price */}
      <div className="mb-3">
        <label htmlFor="price" className="block mb-2 text-gray-700 font-medium">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Enter price"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
          min={0}
        />
      </div>

      {/* Timing */}
      <div className="mb-3">
        <label htmlFor="timing" className="block mb-2 text-gray-700 font-medium">
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
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
        />
      </div>

      {/* Images */}
      <div className="mb-3">
        <label htmlFor="images" className="block mb-2 text-gray-700 font-medium">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleChange}
          accept="image/*"
          className="w-full text-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md shadow-md"
      >
        Submit
      </button>
    </form>
  );
};

export default FormSection;
