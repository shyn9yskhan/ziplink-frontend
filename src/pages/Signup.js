import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, username, password);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');  // Redirect to login page after successful signup
      }, 3000);
    } catch (err) {
      setError(err.message || 'Signup failed');  // Extract message or use a default message
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' , marginTop: '100px'}}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '12px',
            border: '3px solid black',      // Black border for input fields
            borderRadius: '10px',             // Rounded corners
            outline: 'none'
          }}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: '12px',
            border: '3px solid black',      // Black border for input fields
            borderRadius: '10px',             // Rounded corners
            outline: 'none'
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '12px',
            border: '3px solid black',      // Black border for input fields
            borderRadius: '10px',             // Rounded corners
            outline: 'none'
          }}
        />
        <button type="submit"
        style={{
          width: '120px',
          padding: '12px',
          backgroundColor: 'black',       // Black fill for button
          color: 'white',                 // White text color
          border: 'none',
          borderRadius: '10px',            // Rounded corners for button
          cursor: 'pointer',
          alignSelf: 'center'
        }}
        >Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Signup;
