import React, { useState, useEffect } from 'react';

const AgricultorForm = ({ token, onAgricultorGuardado, agricultorEditar, setAgricultorEditar }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [provincia, setProvincia] = useState('');
  const [distrito, setDistrito] = useState('');
  const [userId, setUserId] = useState(1); // fijo por ahora

  useEffect(() => {
    if (agricultorEditar) {
      setNombre(agricultorEditar.nombre);
      setTelefono(agricultorEditar.telefono);
      setDepartamento(agricultorEditar.departamento);
      setProvincia(agricultorEditar.provincia);
      setDistrito(agricultorEditar.distrito);
    } else {
      setNombre('');
      setTelefono('');
      setDepartamento('');
      setProvincia('');
      setDistrito('');
    }
  }, [agricultorEditar]);

  // ✅ Cierre de sesión automático si el token expiró
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const authFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) logout();
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = agricultorEditar
      ? `https://web-production-2486a.up.railway.app/api/agricultores/${agricultorEditar.id}/`
      : 'https://web-production-2486a.up.railway.app/api/agricultores/';
    const method = agricultorEditar ? 'PUT' : 'POST';

    const response = await authFetch(url, {
      method,
      body: JSON.stringify({
        nombre,
        telefono,
        departamento,
        provincia,
        distrito,
        user_id: userId
      })
    });

    if (response.ok) {
      onAgricultorGuardado();
      setAgricultorEditar(null);
      setNombre('');
      setTelefono('');
      setDepartamento('');
      setProvincia('');
      setDistrito('');
    } else {
      alert('Error al guardar agricultor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{agricultorEditar ? 'Editar Agricultor' : 'Registrar Agricultor'}</h3>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
      <input type="text" placeholder="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} required />
      <input type="text" placeholder="Provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} required />
      <input type="text" placeholder="Distrito" value={distrito} onChange={(e) => setDistrito(e.target.value)} required />
      <button type="submit">{agricultorEditar ? 'Guardar Cambios' : 'Crear'}</button>
      {agricultorEditar && (
        <button type="button" onClick={() => setAgricultorEditar(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default AgricultorForm;
