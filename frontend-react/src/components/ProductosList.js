// frontend-react/src/components/ProductosList.js
import React, { useEffect, useState } from 'react';
import ProductoForm from './ProductoForm';

const ProductosList = ({ token, productos, fetchProductos }) => {
  const [error, setError] = useState('');
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    if (token) {
      fetchProductos();
    }
  }, [token, fetchProductos]);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const response = await fetch(`https://web-production-2486a.up.railway.app/api/productos/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProductos();
      } else {
        const errorText = await response.text();
        alert('Error al eliminar el producto: ' + errorText);
      }
    } catch (err) {
      setError('Error al eliminar producto: ' + err.message);
    }
  };

  if (!token) return null;

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
        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - Categoría: {producto.categoria?.nombre || 'Sin categoría'}
              {' '}
              <button onClick={() => setProductoEditar(producto)}>Editar</button>
              <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay productos registrados.</p>
        )}
      </ul>
    </div>
  );
};

export default ProductosList;
