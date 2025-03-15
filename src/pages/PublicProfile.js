import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:9999/profile-content/public/${username}`);
        if (!response.ok) throw new Error('Profile not found');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '1.5rem' }}>Loading...</div>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>
      <button 
        onClick={() => window.location.reload()}
        style={{
          padding: '0.5rem 1rem',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh',
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {profile ? (
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2rem',
            marginBottom: '2rem',
            color: '#1f2937'
          }}>
            {profile.name || username}
          </h1>

          <div style={{ 
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {profile.blocks.map((block, index) => (
              <a
                key={index}
                href={block.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  background: '#ffffff',
                  borderRadius: '0.5rem',
                  border: '2px solid #000000',
                  textDecoration: 'none',
                  color: '#1e293b',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <div style={{ 
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  {block.text}
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>Profile not found</div>
      )}

      {/* Keep original footer styling */}
      <footer style={{ marginTop: 'auto', padding: '10px' }}>
        <h2 style={{
          fontFamily: '"Righteous", serif',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: '25px',
          letterSpacing: '2.5px',
          color: '#7F7F7F',
          margin: 0,
        }}>
          ziplink.kz
        </h2>
      </footer>
    </div>
  );
};

export default PublicProfile;