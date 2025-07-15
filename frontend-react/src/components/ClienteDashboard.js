import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClienteList from './ClienteList';
import OfertaList from './OfertaList';

const ClienteDashboard = ({ token }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>Bienvenido al Panel del Cliente 👤</h2>
      <button onClick={handleLogout} style={styles.logout}>Cerrar Sesión</button>
      <p>Desde aquí puedes ver tus datos personales y explorar las ofertas disponibles.</p>

      <section style={styles.section}>
        <h3>Mis Datos</h3>
        <ClienteList token={token} />
      </section>

      <section style={styles.section}>
        <h3>Ofertas Disponibles 🛒</h3>
        <OfertaList token={token} />
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#fdfdfd',
    borderRadius: '12px'
  },
  section: {
    marginTop: '2rem'
  },
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

export default ClienteDashboard;
