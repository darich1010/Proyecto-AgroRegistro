import React, { useState, useEffect } from 'react';

const ClienteForm = ({ token, onClienteGuardado, clienteEditar, setClienteEditar }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = clienteEditar
      ? `https://web-production-2486a.up.railway.app/api/clientes/${clienteEditar.id}/`
      : 'https://web-production-2486a.up.railway.app/api/clientes/';
    const method = clienteEditar ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        nombre,
        direccion,
        telefono,
        user_id: 28 // 👈 Reemplaza este número con el ID de tu usuario actual si es otro
      })
    });

    if (response.ok) {
      onClienteGuardado();
      setClienteEditar(null);
      setNombre('');
      setDireccion('');
      setTelefono('');
    } else {
      alert('Error al guardar cliente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{clienteEditar ? 'Editar Cliente' : 'Registrar Cliente'}</h3>
      <input
        type="text"
        placeholder="Nombre"
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
      <button type="submit">{clienteEditar ? 'Guardar Cambios' : 'Crear'}</button>
      {clienteEditar && (
        <button type="button" onClick={() => setClienteEditar(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default ClienteForm;
