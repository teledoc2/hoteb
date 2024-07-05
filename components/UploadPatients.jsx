// components/UploadPatients.jsx
'use client';

import { useState } from 'react';
import axios from 'axios';

const UploadPatients = () => {
  const [name, setName] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [companyId, setCompanyId] = useState('');

  const handleSingleUpload = async () => {
    try {
      await axios.post('/api/upload-single', { name, companyId });
      alert('Patient uploaded successfully');
    } catch (error) {
      console.error('Error uploading patient:', error);
      alert('Failed to upload patient');
    }
  };

  const handleBulkUpload = async () => {
    const formData = new FormData();
    formData.append('file', csvFile);
    formData.append('companyId', companyId);

    try {
      await axios.post('/api/upload-bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Patients uploaded successfully');
    } catch (error) {
      console.error('Error uploading patients:', error);
      alert('Failed to upload patients');
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Single Patient Upload</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="border p-2 rounded mb-2"
        />
        <button
          onClick={handleSingleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Bulk Upload from CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
          className="border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="border p-2 rounded mb-2"
        />
        <button
          onClick={handleBulkUpload}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
};

export default UploadPatients;
