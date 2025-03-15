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
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Login error:', error);
      throw error;
  }
};

  
  export const isAuthenticated = () => {
    return Boolean(localStorage.getItem('jwtToken'));  // Return true if token exists
  };
  
  export const logout = () => {
    localStorage.removeItem('jwtToken');
  };