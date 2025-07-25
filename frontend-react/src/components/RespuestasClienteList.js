import React, { useEffect, useState } from 'react';

const RespuestasClienteList = ({ token }) => {
  const [respuestas, setRespuestas] = useState([]);
  const [error, setError] = useState('');
  const [clienteId, setClienteId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  // Obtener el ID del cliente autenticado
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/clientes/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        const cliente = data.find(c => c.usuario.id === userId);
        if (cliente) {
          setClienteId(cliente.id);
        } else {
          setError('Cliente no encontrado.');
        }
      } catch (err) {
        console.error('Error al obtener cliente:', err);
        setError('No se pudo obtener la información del cliente.');
      }
    };

    fetchCliente();
  }, [token, userId]);

  // Obtener las respuestas del backend
  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/respuestas/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        // Filtrar solo respuestas a solicitudes hechas por el cliente autenticado
        const filtradas = data.filter(
          r => r.solicitud.cliente.id === clienteId
        );

        setRespuestas(filtradas);
      } catch (err) {
        console.error('Error al obtener respuestas:', err);
        setError('No se pudieron cargar las respuestas.');
      }
    };

    if (clienteId) {
      fetchRespuestas();
    }
  }, [token, clienteId]);

  if (!token) return null;

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {respuestas.length === 0 ? (
        <p>No hay respuestas a tus solicitudes aún.</p>
      ) : (
        <ul>
          {respuestas.map((respuesta) => (
            <li key={respuesta.id} style={styles.card}>
              <strong>🧑 Agricultor:</strong> {respuesta.agricultor.nombre} <br />
              <strong>📦 Producto:</strong> {respuesta.solicitud.producto.nombre} <br />
              <strong>📄 Tu Solicitud:</strong> {respuesta.solicitud.descripcion} <br />
              <strong>📬 Respuesta:</strong> {respuesta.mensaje} <br />
              <small>🕒 {new Date(respuesta.fecha_respuesta).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f1f8e9',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #d0e6b5'
  }
};

export default RespuestasClienteList;
