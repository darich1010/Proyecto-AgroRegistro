import React from 'react';
import LogoutButton from './LogoutButton';
import OfertaGestion from './OfertaGestion';
import MiPerfilAgricultor from './MiPerfilAgricultor';
import SolicitudesClienteList from './SolicitudesClienteList';
import RespuestaSolicitudForm from './RespuestaSolicitudForm';
import NotificacionesAgricultorList from './NotificacionesAgricultorList'; // ✅ Nuevo import

const AgricultorDashboard = ({ token }) => {
  return (
    <div style={styles.container}>
      <h2>Bienvenido al Panel del Agricultor 🌿</h2>
      <LogoutButton />
      <p>Administra tu información personal y tus ofertas de productos.</p>

      <section style={styles.section}>
        <h3>👨‍🌾 Mi Perfil</h3>
        <MiPerfilAgricultor token={token} />
      </section>

      <section style={styles.section}>
        <h3>📦 Mis Ofertas</h3>
        <OfertaGestion token={token} />
      </section>

      <section style={styles.section}>
        <h3>📋 Solicitudes de Productos</h3>
        <SolicitudesClienteList token={token} />
      </section>

      <section style={styles.section}>
        <h3>✉️ Responder Solicitudes</h3>
        <RespuestaSolicitudForm token={token} />
      </section>

      <section style={styles.section}>
        <h3>🔔 Notificaciones Recibidas</h3>
        <NotificacionesAgricultorList token={token} /> {/* ✅ Aquí se usa el componente */}
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
