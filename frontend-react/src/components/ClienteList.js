import React, { useEffect, useState } from 'react';
import ClienteForm from './ClienteForm';

const ClienteList = ({ token }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clienteEditar, setClienteEditar] = useState(null);

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/clientes/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Error al obtener clientes');

      const data = await response.json();
      setClientes(data);
    } catch (err) {
      setError('Error al cargar clientes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarCliente = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return;

    const response = await fetch(`https://web-production-2486a.up.railway.app/api/clientes/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) {
      fetchClientes();
    } else {
      alert('Error al eliminar cliente');
    }
  };

  useEffect(() => {
    if (token) fetchClientes();
  }, [token]);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} - {cliente.direccion} - Tel: {cliente.telefono}
            {' '}
            <button onClick={() => setClienteEditar(cliente)}>Editar</button>
            <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <ClienteForm
        token={token}
        onClienteGuardado={fetchClientes}
        clienteEditar={clienteEditar}
        setClienteEditar={setClienteEditar}
      />
    </div>
  );
};

export default ClienteList;
