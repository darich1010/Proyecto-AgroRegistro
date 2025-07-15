// frontend-react/src/components/OfertaForm.js
import React, { useEffect, useState } from 'react';

const OfertaForm = ({ token, onOfertaGuardada, ofertaEditar, setOfertaEditar }) => {
  const [agricultores, setAgricultores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [agricultorId, setAgricultorId] = useState('');
  const [productoId, setProductoId] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    const fetchAgricultores = async () => {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/agricultores/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAgricultores(data);
    };

    const fetchProductos = async () => {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProductos(data);
    };

    if (token) {
      fetchAgricultores();
      fetchProductos();
    }
  }, [token]);

  useEffect(() => {
    if (ofertaEditar) {
      setAgricultorId(ofertaEditar.agricultor.id);
      setProductoId(ofertaEditar.producto.id);
      setPrecio(ofertaEditar.precio);
      setStock(ofertaEditar.stock);
    } else {
      setAgricultorId('');
      setProductoId('');
      setPrecio('');
      setStock('');
    }
  }, [ofertaEditar]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!agricultorId || !productoId || !precio || !stock) {
    alert('Completa todos los campos antes de guardar la oferta.');
    return;
  }

  const url = ofertaEditar
    ? `https://web-production-2486a.up.railway.app/api/ofertas/${ofertaEditar.id}/`
    : 'https://web-production-2486a.up.railway.app/api/ofertas/';
  const method = ofertaEditar ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      agricultor_id: parseInt(agricultorId),
      producto_id: parseInt(productoId),
      precio: parseFloat(precio),
      stock: parseInt(stock)
    })
  });

  if (response.ok) {
  onOfertaGuardada();
  setOfertaEditar(null);
  setAgricultorId('');
  setProductoId('');
  setPrecio('');
  setStock('');
} else {
  const errorData = await response.json();
  console.error('Detalles del error:', JSON.stringify(errorData, null, 2));
  alert('Error al guardar la oferta. Revisa consola para más detalles.');
}

};


  return (
    <form onSubmit={handleSubmit}>
      <h3>{ofertaEditar ? 'Editar Oferta' : 'Registrar Oferta'}</h3>

      <select value={agricultorId} onChange={(e) => setAgricultorId(e.target.value)} required>
        <option value="">Selecciona un agricultor</option>
        {agricultores.map(a => (
          <option key={a.id} value={a.id}>{a.nombre}</option>
        ))}
      </select>

      <select value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
        <option value="">Selecciona un producto</option>
        {productos.map(p => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Precio (S/)"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />

      <button type="submit">{ofertaEditar ? 'Guardar Cambios' : 'Crear'}</button>
      {ofertaEditar && (
        <button type="button" onClick={() => setOfertaEditar(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default OfertaForm;
