import React, { useEffect, useState } from 'react';

const OfertasDisponibles = ({ token }) => {
  const [ofertas, setOfertas] = useState([]);
  const [error, setError] = useState('');
  const [clienteId, setClienteId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  // Obtener el ID del cliente
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await fetch(`https://web-production-2486a.up.railway.app/api/clientes/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const cliente = data.find(c => c.usuario.id === userId);
          if (cliente) {
            setClienteId(cliente.id);
            console.log('🆔 clienteId:', cliente.id);
          } else {
            console.warn('⚠️ No se encontró cliente para el usuario con ID', userId);
          }
        } else {
          console.error('❌ Error al obtener clientes');
        }
      } catch (err) {
        console.error('❌ Error en fetchCliente:', err);
      }
    };

    if (token) fetchCliente();
  }, [token, userId]);

  // Obtener ofertas desde el backend
  const fetchOfertas = async () => {
    try {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/ofertas/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('No se pudo obtener las ofertas');
      const data = await response.json();
      setOfertas(data);
    } catch (err) {
      setError('Error al cargar ofertas: ' + err.message);
    }
  };

  // Añadir al carrito (backend) y descontar stock
  const handleAñadirAlCarrito = async (oferta) => {
    if (oferta.stock <= 0) {
      alert('Este producto está agotado');
      return;
    }

    if (!clienteId) {
      alert('No se pudo identificar al cliente.');
      return;
    }

    try {
      console.log('📦 Oferta seleccionada:', oferta);

      // 1. Descontar stock
      const nuevaCantidad = oferta.stock - 1;

      const resStock = await fetch(`https://web-production-2486a.up.railway.app/api/ofertas/${oferta.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          producto_id: oferta.producto.id,
          agricultor_id: oferta.agricultor.id,
          descripcion: oferta.descripcion,
          precio: oferta.precio,
          stock: nuevaCantidad
        }),
      });

      if (!resStock.ok) {
        const text = await resStock.text();
        throw new Error('Error al actualizar stock: ' + text);
      }

      // 2. Añadir al carrito (POST)
      const resCarrito = await fetch(`https://web-production-2486a.up.railway.app/api/carrito/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cliente: clienteId,
          oferta: oferta.id,
          cantidad: 1
        }),
      });

      if (resCarrito.status === 400) {
        // Ya existe, obtener y hacer PUT
        const resItems = await fetch(`https://web-production-2486a.up.railway.app/api/carrito/?cliente=${clienteId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = await resItems.json();
        const existente = items.find(i => i.oferta.id === oferta.id);

        if (existente) {
          await fetch(`https://web-production-2486a.up.railway.app/api/carrito/${existente.id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              cliente: clienteId,
              oferta: oferta.id,
              cantidad: existente.cantidad + 1
            }),
          });
        }
      } else if (!resCarrito.ok) {
        const text = await resCarrito.text();
        throw new Error('Error al añadir al carrito: ' + text);
      }

      await fetchOfertas(); // Refrescar ofertas

    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  useEffect(() => {
    if (token) fetchOfertas();
  }, [token]);

  if (!token) return <p>Debes iniciar sesión para ver las ofertas.</p>;

  return (
    <div>
      <h2>🛒 Ofertas disponibles</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ofertas.length === 0 ? (
        <p>No hay ofertas por el momento.</p>
      ) : (
        <ul>
          {ofertas.map((oferta) => (
            <li key={oferta.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <strong>{oferta.producto.nombre}</strong><br />
              <span>📦 Stock: {oferta.stock}</span><br />
              <span>💬 Descripción: {oferta.descripcion}</span><br />
              <span>💰 Precio: S/ {oferta.precio}</span><br />
              <span>👨‍🌾 Agricultor: {oferta.agricultor.nombre}</span><br />
              <button onClick={() => handleAñadirAlCarrito(oferta)} disabled={!clienteId}>
                Añadir al carrito
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfertasDisponibles;
