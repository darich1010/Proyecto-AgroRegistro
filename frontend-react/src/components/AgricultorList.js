import React, { useEffect, useState } from 'react';
import AgricultorForm from './AgricultorForm';

const AgricultorList = ({ token }) => {
  const [agricultores, setAgricultores] = useState([]);
  const [error, setError] = useState('');
  const [agricultorEditar, setAgricultorEditar] = useState(null);

  const fetchAgricultores = async () => {
    try {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/agricultores/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al obtener agricultores');
      const data = await response.json();
      setAgricultores(data);
    } catch (err) {
      setError('Error al cargar agricultores: ' + err.message);
    }
  };

  useEffect(() => {
    if (token) fetchAgricultores();
  }, [token]);

  const eliminarAgricultor = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este agricultor?');
    if (!confirmar) return;

    const response = await fetch(`https://web-production-2486a.up.railway.app/api/agricultores/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) {
      fetchAgricultores();
    } else {
      alert('Error al eliminar agricultor');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Agricultores</h2>
      <ul>
        {agricultores.map((agricultor) => (
          <li key={agricultor.id}>
            {agricultor.nombre} - Departamento: {agricultor.departamento}, Provincia: {agricultor.provincia}, Distrito: {agricultor.distrito} - Tel: {agricultor.telefono}
            {' '}
            <button onClick={() => setAgricultorEditar(agricultor)}>Editar</button>
            <button onClick={() => eliminarAgricultor(agricultor.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <AgricultorForm
        token={token}
        onAgricultorGuardado={fetchAgricultores}
        agricultorEditar={agricultorEditar}
        setAgricultorEditar={setAgricultorEditar}
      />
    </div>
  );
};

export default AgricultorList;
