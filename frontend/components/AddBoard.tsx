// Create a form component (e.g., FormComponent.tsx)
import React, { useState } from 'react';
import axios from 'axios';

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [savedData, setSavedData] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send the data to the Express API
      const response = await axios.post('http://localhost:5000/api/addboard', formData);
      setSavedData(response.data); // Save the response data
      window.location.reload()
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      setLoading(false);
      setDialogOpen(true); // Open the dialog after data is saved
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setDialogOpen(true)}
      >
        Open Form
      </button>

      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <h2 className="text-2xl mb-4">Form Dialog</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {savedData && (
        <div>
          <h2>Saved Data:</h2>
          <p>Name: {savedData.name}</p>
          <p>Description: {savedData.description}</p>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
