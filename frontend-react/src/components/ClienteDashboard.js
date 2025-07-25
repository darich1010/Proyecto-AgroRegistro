// frontend-react/src/components/ClienteDashboard.js

import React from 'react';
import LogoutButton from './LogoutButton';
import MiPerfilCliente from './MiPerfilCliente';
import OfertasDisponibles from './OfertasDisponibles';
import CarritoCliente from './CarritoCliente';
import SolicitudForm from './SolicitudForm';
import RespuestasClienteList from './RespuestasClienteList';

const ClienteDashboard = ({ token }) => {
  return (
    <div style={styles.container}>
      <h2>Bienvenido al Panel del Cliente 👤</h2>
      <LogoutButton />
      <p>Desde aquí puedes ver tus datos personales y explorar las ofertas disponibles.</p>

      <section style={styles.section}>
        <MiPerfilCliente token={token} />
      </section>

      <section style={styles.section}>
        <h3>Ofertas Disponibles 🛒</h3>
        <OfertasDisponibles token={token} />
      </section>

      <section style={styles.section}>
        <CarritoCliente token={token} />
      </section>

      <section style={styles.section}>
        <SolicitudForm token={token} />
      </section>

      <section style={styles.section}>
        <h3>📬 Respuestas de Agricultores</h3>
        <RespuestasClienteList token={token} />  {/* 👈 NUEVO COMPONENTE */}
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
