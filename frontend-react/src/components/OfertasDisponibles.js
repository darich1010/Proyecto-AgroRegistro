import React, { useEffect, useState } from 'react';

const OfertasDisponibles = ({ token }) => {
  const [ofertas, setOfertas] = useState([]);
  const [error, setError] = useState('');

  const fetchOfertas = async () => {
    try {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/ofertas/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('No se pudo obtener las ofertas');

      const data = await response.json();
      setOfertas(data);
    } catch (err) {
      setError('Error al cargar ofertas: ' + err.message);
    }
  };

  useEffect(() => {
    console.log('✅ Componente OfertasDisponibles cargado');
    if (token) fetchOfertas();
  }, [token]);

  if (!token) return <p>Debes iniciar sesión para ver las ofertas.</p>;

  return (
    <div>
      <h2>🛒 Ofertas disponibles</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ofertas.length === 0 ? (
        <p>No hay ofertas por el momento.</p>
      ) : (
        <ul>
          {ofertas.map((oferta) => (
            <li key={oferta.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <strong>{oferta.producto.nombre}</strong> <br />
              <span>📦 Stock: {oferta.stock}</span><br />
              <span>💬 Descripción: {oferta.descripcion}</span><br />
              <span>💰 Precio: S/ {oferta.precio}</span><br />
              <span>👨‍🌾 Agricultor: {oferta.agricultor.nombre}</span><br />
              {/* Botón futuro para añadir al carrito */}
              <button disabled>Añadir al carrito (pendiente)</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfertasDisponibles;
