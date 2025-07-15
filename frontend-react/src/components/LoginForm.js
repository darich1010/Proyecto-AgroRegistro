import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        logout(); // ✅ Limpia si hay credenciales inválidas o token viejo
        throw new Error('Credenciales inválidas');
      }

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access;

      const userRes = await fetch('https://web-production-2486a.up.railway.app/api/user/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const userData = await userRes.json();

      const clienteRes = await fetch('https://web-production-2486a.up.railway.app/api/clientes/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const clientes = await clienteRes.json();
      const isCliente = clientes.some(cli => cli.user === userData.id);

      const agricultorRes = await fetch('https://web-production-2486a.up.railway.app/api/agricultores/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const agricultores = await agricultorRes.json();
      const isAgricultor = agricultores.some(ag => ag.user === userData.id);

      const rol = isCliente ? 'cliente' : isAgricultor ? 'agricultor' : 'admin';

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('rol', rol);

      onLoginSuccess(accessToken, userData, rol);

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
