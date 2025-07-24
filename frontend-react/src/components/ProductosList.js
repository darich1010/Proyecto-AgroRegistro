// frontend-react/src/components/ProductosList.js
import React, { useEffect, useState } from 'react';

const ProductosList = ({ token, productos, fetchProductos }) => {
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    if (!token || typeof fetchProductos !== 'function') return;
    fetchProductos();
  }, [token]);

  if (!token || !userId) return null;

  // Filtrar solo productos que pertenecen al agricultor autenticado
  const productosDelAgricultor = productos.filter(
    (producto) => producto.agricultor?.usuario?.id === userId
  );

  return (
    <div>
      <h2>Mis Productos</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {Array.isArray(productosDelAgricultor) && productosDelAgricultor.length > 0 ? (
          productosDelAgricultor.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - Categoría: {producto.categoria?.nombre || 'Sin categoría'}
            </li>
          ))
        ) : (
          <p>No tienes productos registrados.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductosList;
