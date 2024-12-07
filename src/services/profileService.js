const API_URL = 'http://localhost:9999';

export const getProfileContent = async () => {
  try {
    const token = localStorage.getItem('jwtToken'); // Ensure token is being retrieved
    const response = await fetch(`${API_URL}/profile-content`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch profile content');
    }

    return await response.json(); // Return the parsed JSON data
  } catch (err) {
    console.error('Error in getProfileContent:', err);
    throw err;
  }
};
