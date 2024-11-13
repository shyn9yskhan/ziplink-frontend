import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Links from './pages/Links';
import Settings from './pages/Settings';
import Navbar from './components/NavBar';
import { isAuthenticated } from './services/authService';

function App() {
  return (
    <Router>
  <div className="App">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>} />

      {/* Authenticated Routes */}
      <Route
      path="/app/*"
      element={isAuthenticated() ? <AuthenticatedLayout /> : <Navigate to="/login" />}
      />
    </Routes>
  </div>
  </Router>
  );
}

function AuthenticatedLayout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="links" element={<Links />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
