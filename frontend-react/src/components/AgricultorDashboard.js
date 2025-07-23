// frontend-react/src/components/AgricultorDashboard.js
import React from 'react';
import LogoutButton from './LogoutButton';
import AgricultorList from './AgricultorList';
import ProductosList from './ProductosList';
import OfertaGestion from './OfertaGestion';


const AgricultorDashboard = ({ token, productos, fetchProductos }) => {
  return (
    <div style={styles.container}>
      <h2>Bienvenido al Panel del Agricultor 🌿</h2>
      <LogoutButton />
      <p>Administra tu información personal, tus productos y ofertas.</p>

      <section style={styles.section}>
        <h3>Mis Productos</h3>
        <ProductosList token={token} productos={productos} fetchProductos={fetchProductos} />
      </section>

      <section style={styles.section}>
        <h3>Mis Ofertas</h3>
        <OfertaGestion token={token} />
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
  }
};

export default AgricultorDashboard;
