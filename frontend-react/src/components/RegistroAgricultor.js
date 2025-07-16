import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroAgricultor = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [provincia, setProvincia] = useState('');
  const [distrito, setDistrito] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Crear usuario
      const userRes = await fetch('https://web-production-2486a.up.railway.app/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!userRes.ok) throw new Error('Error al registrar usuario');
      const newUser = await userRes.json();

      // 2. Obtener token para autorizar creación del agricultor
      const tokenRes = await fetch('https://web-production-2486a.up.railway.app/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!tokenRes.ok) throw new Error('No se pudo obtener token');
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access;

      // 3. Crear agricultor autenticado
      const agriRes = await fetch('https://web-production-2486a.up.railway.app/api/agricultores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          nombre,
          telefono,
          departamento,
          provincia,
          distrito,
          user_id: newUser.id
        })
      });

      if (!agriRes.ok) throw new Error('Error al registrar agricultor');

      alert('Agricultor registrado correctamente');
      navigate('/login-agricultor');

    } catch (err) {
      setError(err.message || 'Error en el registro');
    }
  };

  return (
    <form onSubmit={handleRegistro} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Registro de Agricultor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
      <input type="text" placeholder="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} required />
      <input type="text" placeholder="Provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} required />
      <input type="text" placeholder="Distrito" value={distrito} onChange={(e) => setDistrito(e.target.value)} required />

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegistroAgricultor;
