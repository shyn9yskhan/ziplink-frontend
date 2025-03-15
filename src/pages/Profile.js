import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfileContent, getQRCode } from '../services/profileService';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileContent();
        setProfileData(data.profile);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err.message);
        setError('Failed to load profile content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const fetchQRCode = async () => {
      try {
        const qrDataUrl = await getQRCode();
        setQrCode(qrDataUrl);
      } catch (err) {
        console.error('Error fetching QR code:', err.message);
      }
    };

    fetchProfile();
    fetchQRCode();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const copyProfileUrl = async () => {
    try {
      const url = `ziplink.kz/${profileData.username}`;
      await navigator.clipboard.writeText(url);
      alert('Profile URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.download = `ziplink-${profileData.username}-qrcode.png`;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {profileData && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {profileData.username}
            </h1>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <p style={{ color: '#64748b', margin: 0 }}>
                ziplink.kz/{profileData.username}
              </p>
              <button 
                onClick={copyProfileUrl}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img 
                  src={require('../assets/copy-icon.png')} 
                  alt="Copy" 
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </div>
          </div>

          {qrCode && (
            <div style={{ 
              marginBottom: '2rem',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={qrCode} 
                  alt="QR Code" 
                  style={{ 
                    maxWidth: '200px', 
                    border: '2px solid #000', 
                    borderRadius: '0.5rem' 
                  }} 
                />
                <button
                  onClick={downloadQRCode}
                  style={{
                    position: 'absolute',
                    right: '-40px',
                    bottom: '0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src={require('../assets/download-icon.png')} 
                    alt="Download" 
                    style={{ width: '24px', height: '24px' }}
                  />
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: '100px' }}>
            <button 
              onClick={handleLogout}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '2px solid #ef4444',
                borderRadius: '0.5rem',
                color: '#ef4444',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ':hover': {
                  background: '#ef4444',
                  color: 'white'
                }
              }}
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;