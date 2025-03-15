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

export const getQRCode = async () => {
  try {
    const token = localStorage.getItem('jwtToken'); // Ensure token is being retrieved
    const response = await fetch(`${API_URL}/qrCodeGeneration`, {
      method: 'GET',
      headers: {
        Accept: 'image/png', // Expecting PNG image
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch QR code');
    }

    // Process the response as a Blob
    const blob = await response.blob();
    // Create an object URL for the image
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('Error in getQRCode:', err);
    throw err;
  }
};