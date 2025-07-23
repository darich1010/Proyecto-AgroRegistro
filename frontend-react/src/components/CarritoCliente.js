import React, { useEffect, useState } from 'react';

const CarritoCliente = ({ token }) => {
  const [carrito, setCarrito] = useState([]);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  // Obtener ID del cliente
  const [clienteId, setClienteId] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      const res = await fetch(`https://web-production-2486a.up.railway.app/api/clientes/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const cliente = data.find(c => c.usuario.id === userId);
        if (cliente) setClienteId(cliente.id);
      }
    };

    fetchCliente();
  }, [token, userId]);

  const fetchCarrito = async () => {
    if (!clienteId) return;

    try {
      const res = await fetch(`https://web-production-2486a.up.railway.app/api/carrito/?cliente=${clienteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Error al obtener carrito');

      const data = await res.json();
      setCarrito(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarDelCarrito = async (id) => {
    const confirm = window.confirm('¿Eliminar este producto del carrito?');
    if (!confirm) return;

    const res = await fetch(`https://web-production-2486a.up.railway.app/api/carrito/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      fetchCarrito();
    } else {
      alert('Error al eliminar del carrito');
    }
  };

  useEffect(() => {
    if (clienteId) fetchCarrito();
  }, [clienteId]);

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div style={styles.carrito}>
      <h3>🛍️ Mi Carrito</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {carrito.length === 0 ? (
        <p>No has añadido productos aún.</p>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} style={styles.item}>
                <strong>{item.oferta.producto.nombre}</strong> (x{item.cantidad})<br />
                Precio unitario: S/ {item.precio}<br />
                Total: S/ {(item.precio * item.cantidad).toFixed(2)}<br />
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p><strong>Total del carrito: S/ {total.toFixed(2)}</strong></p>
          <button disabled>Finalizar compra (pendiente)</button>
        </>
      )}
    </div>
  );
};

const styles = {
  carrito: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f2f2f2',
    borderRadius: '10px'
  },
  item: {
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    paddingBottom: '0.5rem'
  }
};

export default CarritoCliente;
