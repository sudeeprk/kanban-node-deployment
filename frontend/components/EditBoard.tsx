"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';


const EditBoard: React.FC = () => {
  const [data, setData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const searchparams = useSearchParams();
  const id = searchparams.get('id');
  const router= useRouter();
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/findboard/${id}`); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/api/editboard`, data); // Replace with your API endpoint
      setMessage('Data updated successfully');
      window.location.replace('/boards');
    } catch (error) {
      console.error('Error updating data:', error);
      setMessage('Error updating data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <button onClick={openDialog} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded w-20 h-11">
        Edit
      </button>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl mb-4">Edit Data</h2>
            <div>
              <label htmlFor="name" className="block text-gray-600">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-gray-600">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                Update Data
              </button>
            </div>
            <button onClick={closeDialog} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-red-600">
              Close
            </button>
          </div>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default EditBoard;
