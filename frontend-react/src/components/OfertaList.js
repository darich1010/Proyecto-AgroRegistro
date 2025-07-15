import React, { useEffect, useState } from 'react';
import OfertaForm from './OfertaForm';

const OfertaList = ({ token }) => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ofertaEditar, setOfertaEditar] = useState(null);

  const fetchOfertas = async () => {
    try {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/ofertas/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al obtener ofertas');
      const data = await res.json();
      setOfertas(data);
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

  if (loading) return <p>Cargando ofertas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Ofertas</h2>
      <ul>
        {ofertas.map(oferta => (
          <li key={oferta.id}>
            Agricultor: {oferta.agricultor.nombre} - Producto: {oferta.producto.nombre} - S/ {oferta.precio} - Stock: {oferta.stock}
            {' '}
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

export default OfertaList;
