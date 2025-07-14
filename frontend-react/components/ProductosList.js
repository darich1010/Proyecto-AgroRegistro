import React, { useEffect, useState } from 'react';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cambia por tu usuario/contraseña reales
    const login = async () => {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'dario2', password: '1234' })
      });

      const data = await response.json();
      if (data.access) {
        setToken(data.access);
      }
    };

    login();
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchProductos = async () => {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      setProductos(data);
      setLoading(false);
    };

    fetchProductos();
  }, [token]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Categoría: {producto.categoria.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosList;
