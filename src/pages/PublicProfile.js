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
        if (!response.ok) {
          throw new Error('Failed to load profile');
        }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div
      className="public-profile"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {profile ? (
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1>{profile.name || username}</h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            {profile.blocks.map((block, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  border: '3px solid #ccc',
                  borderRadius: '10px',
                  maxWidth: '200px',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                }}
              >
                <p>{block.text}</p>
                <a href={block.link} target="_blank" rel="noopener noreferrer">
                  {block.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Profile not found</p>
      )}

      {/* Footer with the logo text */}
      <footer style={{ marginTop: 'auto', padding: '10px' }}>
        <h2
          style={{
            fontFamily: '"Righteous", serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '25px',
            letterSpacing: '2.5px',
            color: '#7F7F7F',
            margin: 0,
          }}
        >
        ziplink.kz
        </h2>
      </footer>
    </div>
  );
};

export default PublicProfile;
