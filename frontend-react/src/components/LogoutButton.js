// frontend-react/src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    navigate('/'); // ✅ Redirige al home
  };

  return (
    <button onClick={handleLogout} style={styles.logout}>
      Cerrar Sesión
    </button>
  );
};

const styles = {
  logout: {
    float: 'right',
    backgroundColor: '#c62828',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default LogoutButton;
