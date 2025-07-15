import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ProductosList from './components/ProductosList';
import AgricultorList from './components/AgricultorList';
import ClienteList from './components/ClienteList';
import OfertaList from './components/OfertaList'; // ✅ NUEVO

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [rol, setRol] = useState(localStorage.getItem('rol') || '');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  useEffect(() => {
    if (token) fetchProductos();
  }, [token]);

  const handleLoginSuccess = (accessToken, userData) => {
    setToken(accessToken);
    setUser(userData);
    setRol(localStorage.getItem('rol')); // Ya se setea desde LoginForm
  };

  // ✅ Redirigir a login si no hay token, user o rol
  if (!token || !rol || !user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <h1>AgroRegistro</h1>
      <p>Bienvenido, {user.username} ({rol})</p>

      {rol === 'cliente' && (
        <>
          <ClienteList token={token} />
        </>
      )}

      {rol === 'agricultor' && (
        <>
          <ProductosList token={token} productos={productos} fetchProductos={fetchProductos} />
          <AgricultorList token={token} />
        </>
      )}

      {rol === 'admin' && (
        <>
          <ProductosList token={token} productos={productos} fetchProductos={fetchProductos} />
          <AgricultorList token={token} />
          <ClienteList token={token} />
          <OfertaList token={token} /> {/* ✅ Sección de Ofertas solo para admin */}
        </>
      )}
    </div>
  );
}

export default App;
