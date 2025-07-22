import React, { useState, useEffect } from 'react';

const ClienteForm = ({ token, onClienteGuardado, clienteEditar, setClienteEditar }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [clientes, setClientes] = useState([]);

  // Obtener todos los clientes una vez (necesario para verificar duplicados)
  useEffect(() => {
    const fetchClientes = async () => {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/clientes/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setClientes(data);
      }
    };

    if (token && !clienteEditar) {
      fetchClientes();
    }
  }, [token, clienteEditar]);

  useEffect(() => {
    if (clienteEditar) {
      setNombre(clienteEditar.nombre);
      setDireccion(clienteEditar.direccion);
      setTelefono(clienteEditar.telefono);
    } else {
      setNombre('');
      setDireccion('');
      setTelefono('');
    }
  }, [clienteEditar]);

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
      },
    });

    if (res.status === 401) logout();
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = clienteEditar
      ? `https://web-production-2486a.up.railway.app/api/clientes/${clienteEditar.id}/`
      : 'https://web-production-2486a.up.railway.app/api/clientes/';
    const method = clienteEditar ? 'PUT' : 'POST';

    const data = { nombre, direccion, telefono };

    if (!clienteEditar) {
      const userId = JSON.parse(localStorage.getItem('user'))?.id;
      if (!userId) {
        alert('No se encontró el ID del usuario autenticado');
        return;
      }

      // ✅ VALIDACIÓN: evitar creación si ya existe cliente para este usuario
      const yaExiste = clientes.some(c => c.usuario === userId);
      if (yaExiste) {
        alert('Este usuario ya tiene un perfil de cliente.');
        return;
      }

      data.usuario_id = userId;
    }

    const response = await authFetch(url, {
      method,
      body: JSON.stringify(data)
    });

    if (response.ok) {
      onClienteGuardado();
      setClienteEditar(null);
      setNombre('');
      setDireccion('');
      setTelefono('');
    } else {
      const errorData = await response.json();
      console.error("❌ Error backend:", errorData);
      alert('Error al guardar cliente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{clienteEditar ? 'Editar Cliente' : 'Registrar Cliente'}</h3>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
      <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
      <button type="submit">{clienteEditar ? 'Guardar Cambios' : 'Crear'}</button>
      {clienteEditar && (
        <button type="button" onClick={() => setClienteEditar(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default ClienteForm;
