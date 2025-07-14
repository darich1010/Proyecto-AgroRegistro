import React, { useEffect, useState } from 'react';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Login para obtener el token
  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch('https://web-production-2486a.up.railway.app/api/token/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'dario2', password: '1234' })
        });

        if (!response.ok) {
          throw new Error('Error al autenticar');
        }

        const data = await response.json();
        setToken(data.access);
      } catch (err) {
        setError('Error al obtener el token: ' + err.message);
        setLoading(false);
      }
    };

    login();
  }, []);

  // Obtener productos una vez que el token esté listo
  useEffect(() => {
    if (!token) return;

    const fetchProductos = async () => {
      try {
        const response = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar productos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [token]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Categoría: {producto.categoria?.nombre || 'Sin categoría'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosList;
