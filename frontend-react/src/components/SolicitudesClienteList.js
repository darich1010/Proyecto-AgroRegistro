import React, { useEffect, useState } from 'react';

const SolicitudesClienteList = ({ token }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState('');

  const fetchSolicitudes = async () => {
    try {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/solicitudes/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('No se pudo cargar las solicitudes');
      const data = await res.json();
      setSolicitudes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSolicitudes();
    }
  }, [token]);

  if (!token) return null;

  return (
    <div>
      <h2>📋 Solicitudes de Productos</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas aún.</p>
      ) : (
        <ul>
          {solicitudes.map((solicitud) => (
            <li key={solicitud.id} style={{ marginBottom: '1rem' }}>
              <strong>Cliente:</strong> {solicitud.cliente?.nombre || 'N/A'} <br />
              <strong>Producto solicitado:</strong> {solicitud.producto?.nombre || 'N/A'} <br />
              <strong>Cantidad:</strong> {solicitud.cantidad} <br />
              <strong>Descripción:</strong> {solicitud.descripcion} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SolicitudesClienteList;
