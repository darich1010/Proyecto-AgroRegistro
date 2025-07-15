import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ProductosList from './components/ProductosList';
import AgricultorList from './components/AgricultorList';
import ClienteList from './components/ClienteList';
import OfertaList from './components/OfertaList';

function App() {
  const [token, setToken] = useState('');
  const [rol, setRol] = useState('');
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [isReady, setIsReady] = useState(false); // ✅

  useEffect(() => {
    // ✅ Cargar desde localStorage una sola vez al iniciar
    const storedToken = localStorage.getItem('token');
    const storedRol = localStorage.getItem('rol');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedRol && storedUser) {
      setToken(storedToken);
      setRol(storedRol);
      setUser(JSON.parse(storedUser));
    }

    setIsReady(true); // ✅ Ya está listo para mostrar login o contenido
  }, []);

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
    setRol(localStorage.getItem('rol'));
  };

  // ✅ Esperar hasta cargar token y datos de sesión
  if (!isReady) return <p>Cargando...</p>;

  // ✅ Redireccionar si no está autenticado
  if (!token || !rol || !user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <h1>AgroRegistro</h1>
      <p>Bienvenido, {user.username} ({rol})</p>

      {rol === 'cliente' && <ClienteList token={token} />}

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
          <OfertaList token={token} />
        </>
      )}
    </div>
  );
}

export default App;
