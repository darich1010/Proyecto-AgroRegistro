import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import ProductosList from './components/ProductosList';
import AgricultorList from './components/AgricultorList';
import ClienteList from './components/ClienteList';
import OfertaList from './components/OfertaList';
import CategoriaList from './components/CategoriaList';

import Home from './components/Home';
import ClienteDashboard from './components/ClienteDashboard';
import AgricultorDashboard from './components/AgricultorDashboard';
import AdminPanel from './components/AdminPanel';
import RegistroCliente from './components/RegistroCliente';
import RegistroAgricultor from './components/RegistroAgricultor';

const AppWrapper = () => {
  const [token, setToken] = useState('');
  const [rol, setRol] = useState('');
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRol = localStorage.getItem('rol');
    const storedUser = localStorage.getItem('user');

    const isTokenExpired = (token) => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp < Math.floor(Date.now() / 1000);
      } catch (e) {
        return true;
      }
    };

    if (storedToken && storedRol && storedUser) {
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('user');
        window.location.reload();
      } else {
        setToken(storedToken);
        setRol(storedRol);
        setUser(JSON.parse(storedUser));
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (token && rol && user) {
      fetchProductos();
    }
  }, [token, rol, user]);

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

  const handleLoginSuccess = (accessToken, userData, userRol) => {
    setToken(accessToken);
    setUser(userData);
    setRol(userRol);
  };

  // ✅ Redirigir automáticamente si ya está logueado
  useEffect(() => {
    if (token && rol && user && location.pathname === '/') {
      if (rol === 'cliente') navigate('/cliente/dashboard');
      else if (rol === 'agricultor') navigate('/agricultor/dashboard');
      else if (rol === 'admin') navigate('/admin/dashboard');
    }
  }, [token, rol, user, location.pathname]);

  // ✅ Redirigir si ya está logueado e intenta ir a login
  if (token && rol && user) {
    if (location.pathname === '/login-cliente' && rol === 'cliente') return <Navigate to="/cliente/dashboard" />;
    if (location.pathname === '/login-agricultor' && rol === 'agricultor') return <Navigate to="/agricultor/dashboard" />;
    if (location.pathname === '/admin' && rol === 'admin') return <Navigate to="/admin/dashboard" />;
  }

  if (!isReady) return <p>Cargando...</p>;

  return (
    <Routes>
      {/* Página pública */}
      <Route path="/" element={<Home />} />

      {/* Login */}
      <Route path="/login-cliente" element={<LoginForm onLoginSuccess={handleLoginSuccess} rolEsperado="cliente" />} />
      <Route path="/login-agricultor" element={<LoginForm onLoginSuccess={handleLoginSuccess} rolEsperado="agricultor" />} />
      <Route path="/admin" element={<LoginForm onLoginSuccess={handleLoginSuccess} rolEsperado="admin" />} />

      {/* Registro */}
      <Route path="/registro-cliente" element={<RegistroCliente />} />
      <Route path="/registro-agricultor" element={<RegistroAgricultor />} />

      {/* Dashboards protegidos */}
      <Route
        path="/cliente/dashboard"
        element={token && rol === 'cliente' ? <ClienteDashboard token={token} /> : <Navigate to="/login-cliente" />}
      />

      <Route
        path="/agricultor/dashboard"
        element={token && rol === 'agricultor' ? (
          <AgricultorDashboard
            token={token}
            productos={productos}
            fetchProductos={fetchProductos}
          />
        ) : <Navigate to="/login-agricultor" />}
      />

      <Route
        path="/admin/dashboard"
        element={token && rol === 'admin' ? (
          <AdminPanel
            token={token}
            productos={productos}
            fetchProductos={fetchProductos}
          />
        ) : <Navigate to="/admin" />}
      />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
