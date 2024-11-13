import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

    return (
      <div className="profile-page">
        <div className="profile-info">
          <p>ziplink.kz/username</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </div>
    );
  };
  
  export default Profile;