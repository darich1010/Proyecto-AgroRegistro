import React from 'react';
import ClienteList from './ClienteList';

const ClienteDashboard = ({ token }) => {
  return (
    <div style={styles.container}>
      <h2>Panel del Cliente 👤</h2>
      <p>Aquí puedes gestionar tu información personal y tus datos de contacto.</p>
      <ClienteList token={token} />
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px'
  }
};

export default ClienteDashboard;
