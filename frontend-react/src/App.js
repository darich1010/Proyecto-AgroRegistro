import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import RegistroCliente from './components/RegistroCliente'; // ✅ nuevo
import RegistroAgricultor from './components/RegistroAgricultor'; // ✅ nuevo

function App() {
  const [token, setToken] = useState('');
  const [rol, setRol] = useState('');
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
  const storedRol = localStorage.getItem('rol');
  const storedUser = localStorage.getItem('user');

  // ✅ Verificar si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Math.floor(Date.now() / 1000); // true si expiró
    } catch (e) {
      return true; // si falla el parseo, tratamos como expirado
    }
  };

  if (storedToken && storedRol && storedUser) {
    if (isTokenExpired(storedToken)) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('user');
      window.location.reload(); // 🔄 fuerza logout limpio
    } else {
      setToken(storedToken);
      setRol(storedRol);
      setUser(JSON.parse(storedUser));
    }
  }

  setIsReady(true);
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
  if (token && rol && user) {
    fetchProductos();
  }
}, [token, rol, user]);

  const handleLoginSuccess = (accessToken, userData, userRol) => {
    setToken(accessToken);
    setUser(userData);
    setRol(userRol);
  };

  if (!isReady) return <p>Cargando...</p>;

  return (
    <Router>
      <Routes>
        {/* PÁGINA PÚBLICA */}
        <Route path="/" element={<Home />} />

        {/* LOGIN */}
        <Route path="/login-cliente" element={<LoginForm onLoginSuccess={handleLoginSuccess} rolEsperado="cliente" />} />
        <Route path="/login-agricultor" element={<LoginForm onLoginSuccess={handleLoginSuccess} rolEsperado="agricultor" />} />
        <Route path="/admin" element={<LoginForm onLoginSuccess={handleLoginSuccess} rolEsperado="admin" />} />

        {/* REGISTRO */}
        <Route path="/registro-cliente" element={<RegistroCliente />} />
        <Route path="/registro-agricultor" element={<RegistroAgricultor />} />

        {/* DASHBOARDS PROTEGIDOS */}
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
    </Router>
  );
}

export default App;
