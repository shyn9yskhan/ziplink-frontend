import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/app/settings">Settings</NavLink>
      <NavLink to="/app/links">Links</NavLink>
      <NavLink to="/app/profile">Profile</NavLink>
    </nav>
  );
};

export default Navbar;