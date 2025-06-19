import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashBoard.css';

const Dashboard = () => {

  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        method:'GET',
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-Type":'application/json',
        },
      });
      const data = await res.json();
      console.log("data",data);
      console.log("token",token);
      setTasks(data);
    } catch (err) {
      alert('Session expired or not authorized');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const handleDelete = async (taskId) => {
  if (!window.confirm('Are you sure you want to delete this task?')) return;

  try {
    await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`, {
        method:'DELETE',
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-Type":'application/json',
        },
      });
    fetchTasks(); 
  } catch (err) {
    alert('Failed to delete task');
  }
};

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>My Tasks</h2>
         <button className="btn" onClick={() => navigate('/task')}>Add Task</button>
        <button onClick={handleLogout}>Logout</button>
      </header>

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => {
            return (
            <div className={`task-card ${task.status === 'Done' ? 'done' : ''}`} key={task._id}>
  <h3>{task.title}</h3>
  <p>{task.description}</p>
  <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
  <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>

  <div className="card-actions">
    <button className="edit-btn" onClick={() => navigate(`/task/${task._id}`, { state: { task } })}>Edit</button>
    <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
  </div>
</div>
            )}
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
