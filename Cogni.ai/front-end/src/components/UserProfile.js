import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user/profile');
        setUser(response.data);
        setPreferences(response.data.preferences);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.put('/user/preferences', { preferences });
      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Learning Style: {user.learningStyle}</p>
      <h2>Preferences</h2>
      <div>
        <label>
          Text Color:
          <input
            type="color"
            value={preferences.textColor}
            onChange={(e) => handlePreferenceChange('textColor', e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Background Color:
          <input
            type="color"
            value={preferences.backgroundColor}
            onChange={(e) => handlePreferenceChange('backgroundColor', e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Font Size:
          <input
            type="number"
            value={preferences.fontSize}
            onChange={(e) => handlePreferenceChange('fontSize', parseInt(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Update Preferences</button>
    </div>
  );
}

export default UserProfile;
