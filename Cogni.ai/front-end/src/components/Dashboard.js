import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function Dashboard() {
  const [modules, setModules] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [modulesResponse, userResponse] = await Promise.all([
          api.get('/learning/modules'),
          api.get('/user/profile')
        ]);
        setModules(modulesResponse.data);
        setUserStats({
          points: userResponse.data.points,
          level: userResponse.data.level,
          completedModules: userResponse.data.completedModules || []
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getModuleStatus = (moduleId) => {
    return userStats.completedModules && userStats.completedModules.includes(moduleId) ? 'Completed' : 'In Progress';
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <h1>Welcome to Cogni</h1>
      <div className="user-stats">
        <p>Points: {userStats.points}</p>
        <p>Level: {userStats.level}</p>
      </div>
      <h2>Available Learning Modules</h2>
      {modules.length === 0 ? (
        <p>No modules available at the moment. Check back soon!</p>
      ) : (
        <ul className="module-list">
          {modules.map(module => (
            <li key={module.id} className="module-item">
              <Link to={`/module/${module.id}`} className="module-link">
                <h3>{module.title}</h3>
                <p>Difficulty: {module.difficulty}</p>
                <p>Status: {getModuleStatus(module.id)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="dashboard-actions">
        <Link to="/profile" className="profile-link">View Profile</Link>
        <Link to="/leaderboard" className="leaderboard-link">Leaderboard</Link>
      </div>
    </div>
  );
}

export default Dashboard;