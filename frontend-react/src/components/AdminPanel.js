import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductosList from './ProductosList';
import AgricultorList from './AgricultorList';
import ClienteList from './ClienteList';
import OfertaList from './OfertaList';
import CategoriaList from './CategoriaList';

const AdminPanel = ({ token, productos, fetchProductos }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={styles.panel}>
      <h2>Panel de Administración 🔧</h2>
      <button onClick={handleLogout} style={styles.logout}>Cerrar Sesión</button>
      <p>Accede a la gestión completa del sistema.</p>

      <section style={styles.section}>
        <h3>Gestión de Productos</h3>
        <ProductosList token={token} productos={productos} fetchProductos={fetchProductos} />
      </section>

      <section style={styles.section}>
        <h3>Gestión de Categorías</h3>
        <CategoriaList token={token} />
      </section>

      <section style={styles.section}>
        <h3>Gestión de Ofertas</h3>
        <OfertaList token={token} />
      </section>

      <section style={styles.section}>
        <h3>Gestión de Agricultores</h3>
        <AgricultorList token={token} />
      </section>

      <section style={styles.section}>
        <h3>Gestión de Clientes</h3>
        <ClienteList token={token} />
      </section>
    </div>
  );
};

const styles = {
  panel: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fdfdfd',
    borderRadius: '10px'
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

export default AdminPanel;
