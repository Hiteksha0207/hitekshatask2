import React, { useState } from 'react';
import FormSection from './components/FormSection';
import LivePreview from './components/LivePreview';

export default function App() {
  const [formData, setFormData] = useState({
    spa_name: '',
    city: '',
    area: '',
    price: '',
    timing: '',
    images: [],
  });

  return (
    <div className="min-h-screen bg-gray-100 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 p-3">
        <FormSection formData={formData} setFormData={setFormData} />
        <LivePreview formData={formData} />
      </div>
    </div>
  );
}
