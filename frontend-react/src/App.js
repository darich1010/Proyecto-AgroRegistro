import React, { useState, useEffect } from 'react';
import ProductosList from './components/ProductosList';
import AgricultorList from './components/AgricultorList';
import ClienteList from './components/ClienteList'; // ✅ Nuevo import

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

      {/* Vista de productos */}
      <ProductosList token={token} productos={productos} fetchProductos={fetchProductos} />

      {/* Vista de agricultores */}
      <AgricultorList token={token} />

      {/* Vista de clientes */}
      <ClienteList token={token} />
    </div>
  );
}

export default App;
