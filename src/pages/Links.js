import React, { useState, useEffect } from 'react';
import { getProfileContent } from '../services/profileService';
import { updateProfileBlocks } from '../services/blockService';

const Links = () => {
  const [blocks, setBlocks] = useState([]);
  const [originalBlocks, setOriginalBlocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      try {
        const data = await getProfileContent();
        setBlocks(data.blocks);
        setOriginalBlocks(data.blocks);
      } catch (err) {
        setError('Failed to load blocks');
      } finally {
        setLoading(false);
      }
    };
    fetchBlocks();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
    setSuccess(null);
  };

  const handleInputChange = (index, field, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index][field] = value;
    setBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (index) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    const isValid = blocks.every(
        (block) => block.text.trim() !== '' && isValidURL(block.link)
    );
    if (!isValid) {
        setError('Ensure all fields are valid.');
        return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
        // Capture the success message returned from the API
        const successMessage = await updateProfileBlocks(blocks);
        setOriginalBlocks(blocks); // Commit the updates
        setSuccess(successMessage);
        setIsEditing(false); // Exit edit mode
    } catch (err) {
        setError(err.message || 'Failed to save changes. Please try again.');
    } finally {
        setSaving(false);
    }
};

  const handleCancel = () => {
    setBlocks(originalBlocks);
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="links-page" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Links</h1>

      {loading && <p>Loading...</p>}
      {saving && <p>Saving changes...</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        {blocks.map((block, index) => (
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
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={block.text}
                  onChange={(e) => handleInputChange(index, 'text', e.target.value)}
                  style={{ width: '100%', marginBottom: '10px' }}
                  disabled={saving}
                />
                <input
                  type="url"
                  value={block.link}
                  onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                  style={{ width: '100%' }}
                  disabled={saving}
                />
                <button
                  onClick={() => handleDeleteBlock(index)}
                  style={{ marginTop: '10px' }}
                  disabled={saving}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <p>{block.text}</p>
                <a href={block.link} target="_blank" rel="noopener noreferrer">
                  {block.link}
                </a>
              </>
            )}
          </div>
        ))}
      </div>

      {isEditing ? (
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSave} style={{ marginRight: '10px' }} disabled={saving}>
            Save
          </button>
          <button onClick={handleCancel} disabled={saving}>
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={handleEditToggle} style={{ marginTop: '20px' }} disabled={loading}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Links;
