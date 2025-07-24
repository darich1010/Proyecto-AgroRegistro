import React, { useEffect, useState } from 'react';
import OfertaForm from './OfertaForm';

const OfertaGestion = ({ token }) => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ofertaEditar, setOfertaEditar] = useState(null);

  const user = JSON.parse(localStorage.getItem('user')); // 🧠 ID del agricultor autenticado

  const fetchOfertas = async () => {
    try {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/ofertas/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Error al obtener ofertas');
      const data = await res.json();

      // 🎯 Solo mostrar las ofertas del agricultor autenticado
      const ofertasFiltradas = data.filter(o => o.agricultor.usuario.id === user?.id);
      setOfertas(ofertasFiltradas);
    } catch (err) {
      setError('Error al cargar ofertas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarOferta = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta oferta?')) return;

    const res = await fetch(`https://web-production-2486a.up.railway.app/api/ofertas/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      fetchOfertas();
    } else {
      alert('Error al eliminar oferta');
    }
  };

  useEffect(() => {
    if (token) fetchOfertas();
  }, [token]);

  if (!token) return null;
  if (loading) return <p>Cargando ofertas...</p>;

  return (
    <div>
      <h2>Lista de Ofertas</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {ofertas.map(oferta => (
          <li key={oferta.id} style={{ marginBottom: '1rem' }}>
            <strong>Agricultor:</strong> {oferta.agricultor.nombre} <br />
            <strong>Producto:</strong> {oferta.producto.nombre} <br />
            <strong>Descripción:</strong> {oferta.descripcion} <br />
            <strong>Precio:</strong> S/ {oferta.precio} <br />
            <strong>Stock:</strong> {oferta.stock} <br />
            <button onClick={() => setOfertaEditar(oferta)}>Editar</button>
            <button onClick={() => eliminarOferta(oferta.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <OfertaForm
        token={token}
        onOfertaGuardada={fetchOfertas}
        ofertaEditar={ofertaEditar}
        setOfertaEditar={setOfertaEditar}
      />
    </div>
  );
};

export default OfertaGestion;
