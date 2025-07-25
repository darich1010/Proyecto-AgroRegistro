// frontend-react/src/components/RespuestaSolicitudForm.js
import React, { useEffect, useState } from 'react';

const RespuestaSolicitudForm = ({ token }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [agricultorId, setAgricultorId] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAgricultor = async () => {
      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/agricultores/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const agricultor = data.find(a => a.usuario.id === user.id);
        if (agricultor) setAgricultorId(agricultor.id);
      } catch (err) {
        console.error('Error al obtener agricultor', err);
        setError('Error al obtener datos del agricultor');
      }
    };

    const fetchSolicitudes = async () => {
      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/solicitudes/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setSolicitudes(data);
      } catch (err) {
        console.error('Error al obtener solicitudes', err);
        setError('Error al obtener solicitudes');
      }
    };

    if (token && user?.id) {
      fetchAgricultor();
      fetchSolicitudes();
    }
  }, [token, user?.id]);

  const handleRespuestaChange = (solicitudId, value) => {
    setRespuestas(prev => ({ ...prev, [solicitudId]: value }));
  };

  const enviarRespuesta = async (solicitudId) => {
    setMensaje('');
    setError('');

    const mensajeRespuesta = respuestas[solicitudId];
    if (!mensajeRespuesta || !mensajeRespuesta.trim()) {
      setError('Debes escribir una respuesta');
      return;
    }

    const payload = {
      solicitud_id: solicitudId,
      agricultor_id: agricultorId,
      mensaje: mensajeRespuesta
    };

    try {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/respuestas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Error al enviar respuesta');
      setMensaje('✅ Respuesta enviada con éxito.');
      setRespuestas(prev => ({ ...prev, [solicitudId]: '' }));
    } catch (err) {
      console.error('Error al enviar respuesta:', err);
      setError('❌ No se pudo enviar la respuesta.');
    }
  };

  return (
    <div style={styles.container}>
      <h3>💬 Responder Solicitudes de Productos</h3>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {solicitudes.length === 0 ? (
        <p>No hay solicitudes disponibles.</p>
      ) : (
        solicitudes.map((solicitud) => (
          <div key={solicitud.id} style={styles.card}>
            <p><strong>Cliente:</strong> {solicitud.cliente?.nombre || 'N/A'}</p>
            <p><strong>Producto:</strong> {solicitud.producto?.nombre || 'N/A'}</p>
            <p><strong>Cantidad:</strong> {solicitud.cantidad}</p>
            <p><strong>Descripción:</strong> {solicitud.descripcion}</p>

            <textarea
              rows="3"
              placeholder="Escribe tu respuesta aquí..."
              value={respuestas[solicitud.id] || ''}
              onChange={(e) => handleRespuestaChange(solicitud.id, e.target.value)}
              style={styles.textarea}
            />
            <br />
            <button onClick={() => enviarRespuesta(solicitud.id)}>Responder</button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px'
  },
  card: {
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem'
  }
};

export default RespuestaSolicitudForm;
