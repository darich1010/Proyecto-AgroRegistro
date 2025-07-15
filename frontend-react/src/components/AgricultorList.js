// frontend-react/src/components/AgricultorList.js
import React, { useEffect, useState } from 'react';
import AgricultorForm from './AgricultorForm';

const AgricultorList = ({ token }) => {
  const [agricultores, setAgricultores] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  const eliminarAgricultor = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este agricultor?')) return;

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

  useEffect(() => {
    if (token) fetchAgricultores();
  }, [token]);

  if (loading) return <p>Cargando agricultores...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Agricultores</h2>
      <ul>
        {agricultores.map((agricultor) => (
          <li key={agricultor.id}>
            {agricultor.nombre} - DNI: {agricultor.dni} - Tel: {agricultor.telefono}
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
