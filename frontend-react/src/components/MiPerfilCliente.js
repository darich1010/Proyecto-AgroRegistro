// src/components/clientes/MiPerfilCliente.js

import React, { useEffect, useState } from 'react';

const MiPerfilCliente = ({ token }) => {
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchCliente = async () => {
      if (!token || !userId) return;

      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/clientes/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Error al obtener cliente');

        const data = await res.json();
        const encontrado = data.find(c => c.usuario.id === userId);

        if (encontrado) {
          setCliente(encontrado);
        } else {
          setError('No se encontró el cliente correspondiente');
        }
      } catch (err) {
        console.error('❌ Error en perfil:', err);
        setError(err.message);
      }
    };

    fetchCliente();
  }, [token, userId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!cliente) return <p>Cargando tus datos...</p>;

  return (
    <div style={styles.card}>
      <h3>👤 Mis Datos</h3>
      <p><strong>Nombre:</strong> {cliente.nombre}</p>
      <p><strong>Dirección:</strong> {cliente.direccion}</p>
      <p><strong>Teléfono:</strong> {cliente.telefono}</p>
    </div>
  );
};

const styles = {
  card: {
    marginTop: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  }
};

export default MiPerfilCliente;
