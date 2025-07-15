import React from 'react';
import AgricultorList from './AgricultorList';
import ProductosList from './ProductosList';

const AgricultorDashboard = ({ token, productos, fetchProductos }) => {
  return (
    <div style={styles.container}>
      <h2>Panel del Agricultor 🌿</h2>
      <p>Desde aquí puedes administrar tus datos personales y tus productos disponibles.</p>

      <section style={styles.section}>
        <h3>Mis Productos</h3>
        <ProductosList
          token={token}
          productos={productos}
          fetchProductos={fetchProductos}
        />
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
