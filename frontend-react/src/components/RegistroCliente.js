import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroCliente = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("➡️ Registrando:", { username, password, nombre, direccion, telefono });

      // ✅ Registrar usuario con tipo "cliente"
      const userRes = await fetch('https://web-production-2486a.up.railway.app/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          tipo_usuario: "cliente",
          nombre,
          direccion,
          telefono
        })
      });

      if (!userRes.ok) {
        const errText = await userRes.text();
        throw new Error(`Registro usuario falló: ${errText}`);
      }

      alert('Cliente registrado correctamente');
      navigate('/login-cliente');

    } catch (err) {
      console.error("🛑 Error completo:", err);
      setError(err.message || 'Error en el registro');
    }
  };

  return (
    <form onSubmit={handleRegistro} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Registro de Cliente</h2>
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
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />

      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegistroCliente;
