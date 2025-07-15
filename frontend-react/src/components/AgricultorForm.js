// frontend-react/src/components/AgricultorForm.js
import React, { useState, useEffect } from 'react';

const AgricultorForm = ({ token, onAgricultorGuardado, agricultorEditar, setAgricultorEditar }) => {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (agricultorEditar) {
      setNombre(agricultorEditar.nombre);
      setDni(agricultorEditar.dni);
      setTelefono(agricultorEditar.telefono);
    } else {
      setNombre('');
      setDni('');
      setTelefono('');
    }
  }, [agricultorEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = agricultorEditar
      ? `https://web-production-2486a.up.railway.app/api/agricultores/${agricultorEditar.id}/`
      : 'https://web-production-2486a.up.railway.app/api/agricultores/';
    const method = agricultorEditar ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, dni, telefono })
    });

    if (response.ok) {
      onAgricultorGuardado();
      setAgricultorEditar(null);
      setNombre('');
      setDni('');
      setTelefono('');
    } else {
      alert('Error al guardar agricultor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{agricultorEditar ? 'Editar Agricultor' : 'Registrar Agricultor'}</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <button type="submit">{agricultorEditar ? 'Guardar Cambios' : 'Crear'}</button>
      {agricultorEditar && (
        <button type="button" onClick={() => setAgricultorEditar(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default AgricultorForm;
