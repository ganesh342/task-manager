import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import '../styles/TaskForm.css';

const TaskForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });


  useEffect(() => {
    const task = location.state?.task;
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.slice(0, 10),
        status: task.status,
      });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = `${process.env.REACT_APP_API_URL}/api/tasks${id ? `/${id}` : ''}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Something went wrong');
      }

      const data = await res.json();
      alert(id ? 'Task updated!' : 'Task created!');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="taskform-container">
      <form className="taskform" onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Task' : 'Create New Task'}</h2>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />

        <label>Due Date</label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />

        <label>Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>

        <div className="form-actions">
          <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;



