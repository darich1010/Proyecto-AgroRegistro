import React, { useEffect, useState } from 'react';

const OfertasDisponibles = ({ token }) => {
  const [ofertas, setOfertas] = useState([]);
  const [error, setError] = useState('');
  const [clienteId, setClienteId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchCliente = async () => {
      const res = await fetch(`https://web-production-2486a.up.railway.app/api/clientes/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const cliente = data.find(c => c.usuario.id === userId);
        if (cliente) setClienteId(cliente.id);
        console.log("🆔 clienteId:", cliente?.id);
      }
    };
    if (token) fetchCliente();
  }, [token, userId]);

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

  const handleAñadirAlCarrito = async (oferta) => {
    if (oferta.stock <= 0) {
      alert('Este producto está agotado');
      return;
    }

    console.log("📦 Oferta seleccionada:", oferta);

    try {
      // 1. Descontar stock
      const nuevaCantidad = oferta.stock - 1;

      const resStock = await fetch(`https://web-production-2486a.up.railway.app/api/ofertas/${oferta.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descripcion: oferta.descripcion,
          producto_id: oferta.producto.id,
          agricultor_id: oferta.agricultor.id,
          precio: oferta.precio,
          stock: nuevaCantidad
        }),
      });

      if (!resStock.ok) throw new Error('Error al actualizar stock');

      // 2. Añadir al carrito sin el campo cliente
      const carritoPayload = {
        oferta: oferta.id,
        cantidad: 1
      };
      console.log("🧾 Enviando al carrito:", carritoPayload);

      const resCarrito = await fetch(`https://web-production-2486a.up.railway.app/api/carrito/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carritoPayload),
      });

      if (resCarrito.status === 400) {
        // Si ya existe, obtener el item y actualizar
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
              oferta: oferta.id,
              cantidad: existente.cantidad + 1
            }),
          });
        }
      } else if (!resCarrito.ok) {
        const errData = await resCarrito.json();
        console.error("❌ Error al añadir al carrito:", errData);
        throw new Error('Error al añadir al carrito');
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
              <button onClick={() => handleAñadirAlCarrito(oferta)}>Añadir al carrito</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfertasDisponibles;
