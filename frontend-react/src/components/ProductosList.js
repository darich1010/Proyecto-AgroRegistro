import React, { useEffect, useState } from 'react';
import ProductoForm from './ProductoForm';

const ProductosList = ({ token, productos, fetchProductos }) => {
  const [error, setError] = useState('');
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    if (!token) return; // ✅ Evita llamada sin token
    fetchProductos();
  }, [token, fetchProductos]);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`https://web-production-2486a.up.railway.app/api/productos/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        fetchProductos();
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (err) {
      setError('Error al eliminar producto: ' + err.message);
    }
  };

  if (!token) return null; // ✅ Previene render si no hay token

  return (
    <div>
      <ProductoForm
        token={token}
        onProductoCreado={fetchProductos}
        productoEditar={productoEditar}
        setProductoEditar={setProductoEditar}
      />

      <h2>Lista de Productos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Categoría: {producto.categoria?.nombre || 'Sin categoría'}
            {' '}
            <button onClick={() => setProductoEditar(producto)}>Editar</button>
            {' '}
            <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosList;
