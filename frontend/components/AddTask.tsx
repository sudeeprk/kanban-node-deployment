import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // Import styles for the modal
import './AddTask.css'; // Create a CSS file for styling

interface TaskData {
  name: string;
  description: string;
  dueDate: string;
}

export const AddTask: React.FC = () => {
  const [formData, setFormData] = useState<TaskData>({
    name: '',
    description: '',
    dueDate: ''
  });

  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Send the task data to the backend
    axios.post('http://localhost:5000/api/addtask', formData)
      .then(() => {
        // Clear the form after successful submission
        setFormData({
          name: '',
          description: '',
          dueDate: ''
        });
        closeModal();
        window.location.replace('/boards');
      })
      .catch((error) => {
        setMessage('Error adding task');
      });
  };

  return (
    <div>
      
      <button onClick={openModal} className="mt-2 ml-3 bg-black hover:bg-green-700 text-white font-bold h-12 w-25 rounded-md p-2">Add Task</button>
      <Modal open={isModalOpen} onClose={closeModal} center classNames={{ modal: 'custom-modal' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" className='m-2' name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" className='m-2' name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <label>Due Date:</label>
            <input type="date" className='m-2' name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>
          <button className='m-2 bg-black rounded-md w-28 h-10 text-white' type="submit">Add Task</button>
        </form>
      </Modal>
      {message && <p>{message}</p>}
    </div>
  );
};
