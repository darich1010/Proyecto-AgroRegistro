// frontend-react/src/components/ProductoForm.js
import React, { useState, useEffect } from 'react';

const ProductoForm = ({ token, onProductoCreado }) => {
  const [nombre, setNombre] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await fetch('https://web-production-2486a.up.railway.app/api/categorias/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCategorias(data);
    };

    if (token) fetchCategorias();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://web-production-2486a.up.railway.app/api/productos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, categoria_id: parseInt(categoriaId) })
    });

    if (response.ok) {
      setNombre('');
      setCategoriaId('');
      onProductoCreado(); // refresca lista
    } else {
      alert('Error al crear producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear Nuevo Producto</h3>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
        <option value="">Selecciona una categoría</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>
      <button type="submit">Crear</button>
    </form>
  );
};

export default ProductoForm;
