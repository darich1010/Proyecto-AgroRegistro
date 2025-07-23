import React, { useEffect, useState } from 'react';

const CarritoCliente = ({ token }) => {
  const [carrito, setCarrito] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  // Paso 1: obtener ID del cliente desde el backend
  useEffect(() => {
    const fetchCliente = async () => {
      if (!token || !userId) return;

      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/clientes/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Token inválido o expirado al obtener cliente');

        const data = await res.json();
        const cliente = data.find(c => c.usuario.id === userId);
        if (cliente) {
          setClienteId(cliente.id);
        } else {
          setError('No se encontró el cliente asociado al usuario');
        }
      } catch (err) {
        console.error('❌ Error al obtener cliente:', err);
        setError(err.message);
      }
    };

    fetchCliente();
  }, [token, userId]);

  // Paso 2: función reutilizable para obtener el carrito
  const fetchCarrito = async () => {
    if (!clienteId) return;

    try {
      const res = await fetch(`https://web-production-2486a.up.railway.app/api/carrito/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Error al obtener carrito');

      const data = await res.json();
      setCarrito(data);
    } catch (err) {
      console.error('❌ Error al cargar carrito:', err);
      setError(err.message);
    }
  };

  // Paso 3: usar fetchCarrito cuando el cliente esté listo
  useEffect(() => {
    if (clienteId) {
      fetchCarrito();
    }
  }, [clienteId]);

  // Paso 4: eliminar del carrito
  const eliminarDelCarrito = async (id) => {
    const confirm = window.confirm('¿Eliminar este producto del carrito?');
    if (!confirm) return;

    try {
      const res = await fetch(`https://web-production-2486a.up.railway.app/api/carrito/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setCarrito(prev => prev.filter(item => item.id !== id));
      } else {
        throw new Error('No se pudo eliminar del carrito');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const total = carrito.reduce((sum, item) => {
    const precio = parseFloat(item.oferta?.precio || 0);
    return sum + precio * item.cantidad;
  }, 0);

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
                <strong>{item.oferta?.producto?.nombre || 'Producto desconocido'}</strong> (x{item.cantidad})<br />
                Precio unitario: S/ {item.oferta?.precio}<br />
                Total: S/ {(parseFloat(item.oferta?.precio || 0) * item.cantidad).toFixed(2)}<br />
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
