// Updated version of src/pages/Search.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchUsers } from '../services/userService';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Focus the search input on component mount
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  // Clear results when user edits search after a search
  useEffect(() => {
    if (hasSearched && searchQuery !== lastSearchedQuery) {
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [searchQuery, hasSearched, lastSearchedQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    setHasSearched(true);
    setLastSearchedQuery(searchQuery);
    
    try {
      const results = await searchUsers(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const viewProfile = (username) => {
    navigate(`/${username}`);
  };

  // Define message styles
  const messageStyle = { 
    textAlign: 'center', 
    color: '#666',
    padding: '1.5rem',
    border: '2px dashed #e5e7eb',
    borderRadius: '0.75rem'
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 100px)'
    }}>
      <h1 style={{ 
        fontSize: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        color: '#1f2937'
      }}>
        Search Users
      </h1>
      
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        {error && (
          <p style={{ 
            color: '#ef4444', 
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            {error}
          </p>
        )}
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '1rem'
        }}>
          <input
            ref={searchInputRef}
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter username"
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '2px solid #000',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              ':focus': {
                outline: 'none',
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)'
              },
              ...(loading ? { opacity: 0.7 } : {})
            }}
          />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              opacity: loading || !searchQuery.trim() ? 0.7 : 1,
              ':hover': {
                background: loading || !searchQuery.trim() ? '#000' : '#333'
              }
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {/* Search results */}
      <div>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <p>Searching users...</p>
            <div style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0,0,0,0.1)',
              borderTop: '3px solid #000',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginTop: '1rem'
            }}></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div style={{
            border: '2px solid #e5e7eb',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            {searchResults.map(user => (
              <div 
                key={user.id}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s ease',
                  ':hover': {
                    background: '#f9fafb'
                  },
                  ':last-child': {
                    borderBottom: 'none'
                  }
                }}
              >
                <span style={{ 
                  fontWeight: '500',
                  fontSize: '1.1rem'
                }}>
                  {user.username}
                </span>
                <button
                  onClick={() => viewProfile(user.username)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      background: '#333'
                    }
                  }}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        ) : hasSearched && searchQuery === lastSearchedQuery ? (
          <p style={messageStyle}>
            No users found matching "<strong>{searchQuery}</strong>"
          </p>
        ) : (
          <p style={messageStyle}>
            Enter a username to search for other users
          </p>
        )}
      </div>
      
      {/* Add CSS animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Search;