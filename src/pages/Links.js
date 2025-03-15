import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getProfileContent } from '../services/profileService';
import { updateProfileBlocks } from '../services/blockService';
import { FaGripVertical, FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const colors = {
  primary: '#2563eb',
  success: '#16a34a',
  danger: '#dc2626',
  warning: '#d97706',
  gray: '#6b7280',
  lightGray: '#e5e7eb',
  white: '#ffffff'
};

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
        const blocksWithIds = data.blocks.map(block => ({
          ...block,
          id: block.id || uuidv4()
        }));
        setBlocks(blocksWithIds);
        setOriginalBlocks(blocksWithIds);
      } catch (err) {
        setError('Failed to load links');
      } finally {
        setLoading(false);
      }
    };
    fetchBlocks();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setBlocks(items);
  };

  const handleAddLink = () => {
    const newBlock = { 
      id: uuidv4(),
      text: '', 
      link: '',
      type: 'textWithLinkBlock'
    };
    setBlocks([newBlock, ...blocks]);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
    setSuccess(null);
    if (!isEditing) setBlocks([...originalBlocks]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedBlocks = blocks.map(block => 
      block.id === id ? { ...block, [field]: value } : block
    );
    setBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (id) => {
    const updatedBlocks = blocks.filter(block => block.id !== id);
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
    const isValid = blocks.every(block => 
      block.text.trim() !== '' && 
      isValidURL(block.link)
    );

    if (!isValid) {
      setError('All links must have a title and valid URL');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const successMessage = await updateProfileBlocks(blocks.map(({ id, ...rest }) => rest));
      setOriginalBlocks(blocks);
      setSuccess(successMessage);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to save changes');
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
    <div style={{ 
      padding: '2rem',
      maxWidth: '768px',
      margin: '0 auto',
      fontFamily: 'Segoe UI, system-ui, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '2rem',
        paddingBottom: '0.5rem',
        borderBottom: `2px solid ${colors.lightGray}`
      }}>
        Manage Links
      </h1>

      {loading && <p>Loading links...</p>}
      {saving && <p>Saving changes...</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '20px' }}>
        {isEditing ? (
          <>
            <div style={{ 
              display: 'flex',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ 
                  flex: 1,
                  padding: '10px 20px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                style={{ 
                  flex: 1,
                  padding: '10px 20px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
            <button 
              onClick={handleAddLink}
              disabled={saving}
              style={{ 
                width: '100%',
                padding: '10px 20px',
                background: '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FaPlus /> Add new link
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
        )}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {blocks.map((block, index) => (
                <Draggable 
                  key={block.id}
                  draggableId={block.id}
                  index={index}
                  isDragDisabled={!isEditing || saving}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        marginBottom: '15px',
                      }}
                    >
                      <div
                        style={{
                          padding: '20px',
                          border: '2px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: snapshot.isDragging ? '#f0f0f0' : '#fff',
                          position: 'relative'
                        }}
                      >
                        {isEditing && (
                          <div 
                            {...provided.dragHandleProps}
                            style={{ 
                              position: 'absolute',
                              left: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              cursor: 'grab',
                              padding: '5px'
                            }}
                          >
                            <FaGripVertical 
                              style={{ 
                                color: '#666',
                                fontSize: '1.2rem'
                              }}
                            />
                          </div>
                        )}

                        <div style={{ marginLeft: '30px' }}>
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={block.text}
                                onChange={(e) => handleInputChange(block.id, 'text', e.target.value)}
                                placeholder="Link title"
                                style={{ 
                                  width: '100%', 
                                  marginBottom: '10px', 
                                  padding: '8px' 
                                }}
                              />
                              <input
                                type="url"
                                value={block.link}
                                onChange={(e) => handleInputChange(block.id, 'link', e.target.value)}
                                placeholder="https://example.com"
                                style={{ 
                                  width: '100%', 
                                  padding: '8px' 
                                }}
                              />
                              <button
                                onClick={() => handleDeleteBlock(block.id)}
                                style={{ 
                                  marginTop: '10px',
                                  padding: '8px 16px',
                                  background: '#ff4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                Delete
                              </button>
                            </>
                          ) : (
                            <>
                              <h3 style={{ margin: '0 0 8px 0' }}>{block.text}</h3>
                              <a
                                href={block.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#007bff' }}
                              >
                                {block.link}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Links;