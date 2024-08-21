import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function AdminDashboard() {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState({ title: '', content: '', difficulty: 'beginner' });

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await api.get('/admin/modules');
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewModule({ ...newModule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/modules', newModule);
      setNewModule({ title: '', content: '', difficulty: 'beginner' });
      fetchModules();
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/modules/${id}`);
      fetchModules();
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Create New Module</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newModule.title}
          onChange={handleInputChange}
          placeholder="Module Title"
          required
        />
        <textarea
          name="content"
          value={newModule.content}
          onChange={handleInputChange}
          placeholder="Module Content"
          required
        />
        <select name="difficulty" value={newModule.difficulty} onChange={handleInputChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit">Create Module</button>
      </form>
      <h2>Existing Modules</h2>
      <ul>
        {modules.map(module => (
          <li key={module.id}>
            {module.title} - {module.difficulty}
            <button onClick={() => handleDelete(module.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;