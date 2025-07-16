import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const tokenRes = await fetch('https://web-production-2486a.up.railway.app/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!tokenRes.ok) {
        logout();
        throw new Error('Credenciales inválidas');
      }

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access;

      if (!accessToken || accessToken.trim() === '') {
        logout();
        throw new Error('Token inválido');
      }

      const userRes = await fetch('https://web-production-2486a.up.railway.app/api/user/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const userData = await userRes.json();

      // Obtener listas
      const [clienteRes, agricultorRes] = await Promise.all([
        fetch('https://web-production-2486a.up.railway.app/api/clientes/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        }),
        fetch('https://web-production-2486a.up.railway.app/api/agricultores/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
      ]);

      const clientes = await clienteRes.json();
      const agricultores = await agricultorRes.json();

      const isCliente = clientes.some(cli => cli.user === userData.id);
      const isAgricultor = agricultores.some(ag => ag.user === userData.id);

      console.log('userData.id:', userData.id);
      console.log('Clientes:', clientes.map(c => c.user));
      console.log('Agricultores:', agricultores.map(a => a.user));
      console.log('isCliente:', isCliente, 'isAgricultor:', isAgricultor);

      let rol = 'admin';
      if (isCliente) rol = 'cliente';
      else if (isAgricultor) rol = 'agricultor';

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('rol', rol);

      onLoginSuccess(accessToken, userData, rol);

      if (rol === 'cliente') navigate('/cliente/dashboard');
      else if (rol === 'agricultor') navigate('/agricultor/dashboard');
      else navigate('/admin/dashboard');

    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default LoginForm;
