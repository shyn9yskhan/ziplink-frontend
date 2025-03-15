import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, login: authLogin } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/app/profile', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const { token } = await login(username, password);
            authLogin(token);
            navigate('/app/profile', { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '100px auto' }}>
            <h2>Log in</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                        padding: '12px',
                        border: '3px solid black',
                        borderRadius: '10px',
                        outline: 'none'
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        padding: '12px',
                        border: '3px solid black',
                        borderRadius: '10px',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '12px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer'
                    }}
                >
                    Log in
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p style={{ marginTop: '40px' }}>
                Don't have an account? <Link to="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;