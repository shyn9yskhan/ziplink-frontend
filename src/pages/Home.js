import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div>
            <h1 className='ziplink-brand-logo'>ziplink</h1>
            <p>Welcome to the Home Page!</p>
            <Link to="/login">
                <button>Go to Login</button>
            </Link>
        </div>
    );
};

export default Home;
