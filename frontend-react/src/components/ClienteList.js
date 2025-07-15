import React, { useEffect, useState } from 'react';
import ClienteForm from './ClienteForm';

const ClienteList = ({ token }) => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // ✅ nuevo
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
      setLoading(false); // ✅ marca como terminado
    }
  };

  useEffect(() => {
    if (token) fetchClientes();
  }, [token]);

  if (!token) return null; // ✅ evita renderizar si no hay token
  if (loading) return <p>Cargando clientes...</p>; // ✅ evita errores visuales

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nombre} - Dirección: {cliente.direccion} - Tel: {cliente.telefono}
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
