import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // Import styles for the modal
import './AddBoard.css'; // Create a CSS file for styling

interface TaskData {
  name: string;
  description: string;
}
const AddBoard: React.FC = () => {
  const [formData, setFormData] = useState<TaskData>({
    name: '',
    description: ''
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
    axios.post('http://localhost:5000/api/addboard', formData)
      .then(() => {
        setFormData({
          name: '',
          description: ''
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
      
      <button onClick={openModal} className="mt-2 ml-3 bg-black text-white font-bold h-12 w-25 rounded-md p-2 hover:bg-green-700">Add Board</button>
      <Modal open={isModalOpen} onClose={closeModal} center classNames={{ modal: 'custom-modal' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" className='m-2' name="name" placeholder='Enter board name' value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" className='m-2' name="description" placeholder='Enter board description' value={formData.description} onChange={handleChange} required />
          </div>
          <button className='m-2 bg-black rounded-md w-28 h-10 hover:bg-cyan-700 text-white' type="submit">Add Task</button>
        </form>
      </Modal>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBoard