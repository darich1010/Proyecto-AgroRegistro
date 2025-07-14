// frontend-react/src/components/ProductosList.js
import React, { useEffect, useState } from 'react';
import ProductoForm from './ProductoForm';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch('https://web-production-2486a.up.railway.app/api/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'testnuevo', password: '1234' })
        });

        if (!response.ok) throw new Error('Error al autenticar');

        const data = await response.json();
        setToken(data.access);
      } catch (err) {
        setError('Error al obtener el token: ' + err.message);
        setLoading(false);
      }
    };

    login();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Error al obtener productos');

      const data = await response.json();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar productos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProductos();
  }, [token]);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    const response = await fetch(`https://web-production-2486a.up.railway.app/api/productos/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) {
      fetchProductos(); // refrescar lista
    } else {
      alert('Error al eliminar el producto');
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <ProductoForm
        token={token}
        onProductoCreado={fetchProductos}
        productoEditar={productoEditar}
        setProductoEditar={setProductoEditar}
      />

      <h2>Lista de Productos</h2>
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
