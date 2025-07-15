import React from 'react';
import { useNavigate } from 'react-router-dom';
import AgricultorList from './AgricultorList';
import ProductosList from './ProductosList';
import OfertaList from './OfertaList';

const AgricultorDashboard = ({ token, productos, fetchProductos }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>Bienvenido al Panel del Agricultor 🌿</h2>
      <button onClick={handleLogout} style={styles.logout}>Cerrar Sesión</button>
      <p>Administra tu información personal, tus productos y ofertas.</p>

      <section style={styles.section}>
        <h3>Mis Productos</h3>
        <ProductosList token={token} productos={productos} fetchProductos={fetchProductos} />
      </section>

      <section style={styles.section}>
        <h3>Mis Ofertas</h3>
        <OfertaList token={token} />
      </section>

      <section style={styles.section}>
        <h3>Datos Personales</h3>
        <AgricultorList token={token} />
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f0f9f0',
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

export default AgricultorDashboard;
