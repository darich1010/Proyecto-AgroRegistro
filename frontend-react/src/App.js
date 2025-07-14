import React, { useState, useEffect } from 'react';
import ProductosList from './components/ProductosList';

function App() {
  const [token, setToken] = useState('');
  const [productos, setProductos] = useState([]);

  const login = async () => {
    const response = await fetch('https://web-production-2486a.up.railway.app/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testnuevo', password: '1234' })
    });

    const data = await response.json();
    if (data.access) setToken(data.access);
  };

  const fetchProductos = async () => {
    const response = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setProductos(data);
  };

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    if (token) fetchProductos();
  }, [token]);

  return (
    <div>
      <h1>AgroRegistro</h1>
      <ProductosList token={token} productos={productos} fetchProductos={fetchProductos} />
    </div>
  );
}

export default App;
