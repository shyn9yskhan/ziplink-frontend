const API_URL = 'http://localhost:9999';

export const signup = async (email, username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const data = await response.json();
    return data;  // Success response from server
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.message || 'Signup failed. Please try again.');
  }
};
  
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Required header for JSON data
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();  // Parse JSON response
    const token = data.token;  // Assuming JWT token is in `data.token`
    localStorage.setItem('jwtToken', token);  // Store token for future requests
    return token;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed. Please try again.');
  }
};
  
  export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('jwtToken'));  // Return true if token exists
  };
  
  export const logout = () => {
    localStorage.removeItem('jwtToken');
  };