import React, { useEffect, useState } from 'react';

const SolicitudForm = ({ token }) => {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Obtener lista de productos con autorización ✅
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) throw new Error('Error al obtener productos');

        const data = await res.json();

        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          throw new Error('La respuesta no es una lista de productos');
        }
      } catch (err) {
        console.error('❌ Error al obtener productos:', err);
        setError('No se pudieron cargar los productos.');
      }
    };

    fetchProductos();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!productoId || !cantidad || !descripcion) {
      setError('Completa todos los campos.');
      return;
    }

    const payload = {
      producto: parseInt(productoId),
      cantidad: parseInt(cantidad),
      descripcion: descripcion.trim()
      // cliente y fecha_solicitud ya los gestiona el backend automáticamente
    };

    try {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/solicitudes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('No se pudo enviar la solicitud.');

      setMensaje('✅ Solicitud enviada con éxito.');
      setProductoId('');
      setCantidad('');
      setDescripcion('');
    } catch (err) {
      console.error('Error al enviar solicitud:', err);
      setError('❌ Error al enviar la solicitud.');
    }
  };

  return (
    <div style={styles.container}>
      <h3>📨 Publicar Solicitud de Producto</h3>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Producto:
          <select value={productoId} onChange={e => setProductoId(e.target.value)}>
            <option value="">Selecciona un producto</option>
            {Array.isArray(productos) && productos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Cantidad:
          <input
            type="number"
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
            min="1"
          />
        </label>
        <br />

        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            rows="3"
          />
        </label>
        <br />

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '2rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f5f5f5'
  }
};

export default SolicitudForm;
