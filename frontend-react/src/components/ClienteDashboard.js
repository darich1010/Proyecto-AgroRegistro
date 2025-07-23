// frontend-react/src/components/ClienteDashboard.js
import React from 'react';
import LogoutButton from './LogoutButton';
import ClienteList from './ClienteList';
import OfertasDisponibles from './OfertasDisponibles';

const ClienteDashboard = ({ token }) => {
  return (
    <div style={styles.container}>
      <h2>Bienvenido al Panel del Cliente 👤</h2>
      <LogoutButton />
      <p>Desde aquí puedes ver tus datos personales y explorar las ofertas disponibles.</p>

      <section style={styles.section}>
        <h3>Mis Datos</h3>
        <ClienteList token={token} />
      </section>

      <section style={styles.section}>
        <h3>Ofertas Disponibles 🛒</h3>
        <OfertasDisponibles token={token} />
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
  }
};

export default ClienteDashboard;
