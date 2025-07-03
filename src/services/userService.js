const API_URL = 'http://localhost:9999';

export const searchUsers = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/search/user_by_username?username=${
        encodeURIComponent(query)}`, 
        {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to search users');
    }

    const usernames = await response.json();

    return usernames.map((username, index) => ({
      id: index, // Temporary ID since backend only returns usernames
      username
    }));
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};