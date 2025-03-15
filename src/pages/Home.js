import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div>
            <div className="logo-container">
                <img 
                    src={require('../assets/logoIcon.png')} 
                    alt="Ziplink Logo" 
                    className="logo-image"
                />
                <h1 className='ziplink-brand-logo'>ziplink</h1>
            </div>
            <p>All your links, zipped into one ziplink.</p>
            <Link to="/login">
                <button className="login-button">Go to Login</button>
            </Link>
        </div>
    );
};

export default Home;