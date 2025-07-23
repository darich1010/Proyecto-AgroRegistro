// frontend-react/src/components/AdminPanel.js
import React from 'react';
import LogoutButton from './LogoutButton';
import ProductosList from './ProductosList';
import AgricultorList from './AgricultorList';
import ClienteList from './ClienteList';
import OfertaGestion from './OfertaGestion';
import CategoriaList from './CategoriaList';

const AdminPanel = ({ token, productos, fetchProductos }) => {
  return (
    <div style={styles.panel}>
      <h2>Panel de Administración 🔧</h2>
      <LogoutButton />
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
        <OfertaGestion token={token} />
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
  }
};

export default AdminPanel;
