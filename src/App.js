import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Links from './pages/Links';
import Settings from './pages/Settings';
import PublicProfile from './pages/PublicProfile';
import Search from './pages/Search';
import Navbar from './components/NavBar';
import { isAuthenticated } from './services/authService';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
      <AuthProvider>
          <Router>
              <div className="App">
                  <Routes>
                      <Route path='/' element={<Home/>}/>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/signup' element={<Signup/>} />
                      <Route path='/:username' element={<PublicProfile/>}/>
                      <Route path="/app/*" element={<ProtectedRoutes/>} />
                  </Routes>
              </div>
          </Router>
      </AuthProvider>
  );
}

function ProtectedRoutes() {
  const { isAuthenticated, initialized } = useAuth();

  if (!initialized) return <div>Loading...</div>;
  
  return isAuthenticated ? <AuthenticatedLayout/> : <Navigate to="/login" replace />;
}

function AuthenticatedLayout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="links" element={<Links />} />
        <Route path="settings" element={<Settings />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
