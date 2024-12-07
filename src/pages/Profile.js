import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { getProfileContent } from '../services/profileService';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchProfile = async () => {
    try {
      const data = await getProfileContent();
      setProfileData(data.profile);
      setBlocks(data.blocks);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      setError('Failed to load profile content. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page">
      {error && <p className="error">{error}</p>}
      <button onClick={handleFetchProfile}>Load Profile</button>
      {profileData && (
        <>
          <div className="profile-info">
            <h1>{profileData.username}</h1>
            <p>ziplink.kz/{profileData.username}</p>
          </div>
          <div className="blocks">
            {blocks.map((block, index) => (
              <div key={index} className="block">
                <p>{block.text}</p>
                <a href={block.link} target="_blank" rel="noopener noreferrer">
                  {block.link}
                </a>
              </div>
            ))}
          </div>
        </>
      )}
      <button className="logout-button" onClick={handleLogout}
      style={{
        padding: '12px',
        border: '3px solid red',
        borderRadius: '10px',
        outline: 'none',
        backgroundColor: 'white',
        color: 'red',
        cursor: 'pointer',
        alignSelf: 'center'
      }}
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;