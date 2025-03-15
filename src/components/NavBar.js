import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      padding: '1.5rem',
      background: '#ffffff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <NavLink 
        to="/app/settings"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#3b82f6' : '#64748b',
          fontWeight: '500',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          transition: 'all 0.2s ease',
          ...(isActive && {
            background: '#f0f4ff',
            fontWeight: '600'
          }),
          ':hover': {
            background: '#f8fafc',
            color: '#3b82f6'
          }
        })}
      >
        Settings
      </NavLink>
      
      <NavLink 
        to="/app/links"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#3b82f6' : '#64748b',
          fontWeight: '500',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          transition: 'all 0.2s ease',
          ...(isActive && {
            background: '#f0f4ff',
            fontWeight: '600'
          }),
          ':hover': {
            background: '#f8fafc',
            color: '#3b82f6'
          }
        })}
      >
        Links
      </NavLink>
      
      <NavLink 
        to="/app/profile"
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#3b82f6' : '#64748b',
          fontWeight: '500',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          transition: 'all 0.2s ease',
          ...(isActive && {
            background: '#f0f4ff',
            fontWeight: '600'
          }),
          ':hover': {
            background: '#f8fafc',
            color: '#3b82f6'
          }
        })}
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default Navbar;