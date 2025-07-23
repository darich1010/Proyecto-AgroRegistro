// frontend-react/src/components/ClienteDashboard.js
import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import ClienteList from './ClienteList';
import OfertasDisponibles from './OfertasDisponibles';
import CarritoCliente from './CarritoCliente';

const ClienteDashboard = ({ token }) => {
  const [carrito, setCarrito] = useState([]);

  const añadirAlCarrito = (oferta) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === oferta.id);
      if (existente) {
        return prev.map((item) =>
          item.id === oferta.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...oferta, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

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
        <OfertasDisponibles token={token} añadirAlCarrito={añadirAlCarrito} />
      </section>

      <section style={styles.section}>
        <h3>🛍️ Mi Carrito</h3>
        <CarritoCliente carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
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
