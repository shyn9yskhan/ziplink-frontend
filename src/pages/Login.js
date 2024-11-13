import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await login(username, password);
            navigate('/app/profile');  // Redirect to profile page after login
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
      <div style={{ maxWidth: '300px', margin: '0 auto', marginTop: '100px'}}>
        <h2>Log in</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
          <button
            type="submit"
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
          >
            Log In
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p style={{ marginTop: '10px' }}>
          Do not have an account? <Link to="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>Sign Up</Link>
        </p>
      </div>
  );
};
    
    export default Login;