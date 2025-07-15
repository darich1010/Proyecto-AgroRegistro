// frontend-react/src/components/ProductoForm.js
import React, { useState, useEffect } from 'react';

const ProductoForm = ({ token, onProductoCreado = () => {}, productoEditar, setProductoEditar }) => {
  const [nombre, setNombre] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://web-production-2486a.up.railway.app/api/categorias/', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('No autorizado o error al obtener categorías');

        const data = await response.json();

        // ✅ Validar que sea array
        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          throw new Error('La respuesta de categorías no es un array');
        }

      } catch (err) {
        setError('Error al cargar categorías: ' + err.message);
      }
    };

    if (token) fetchCategorias();
  }, [token]);

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre);
      setCategoriaId(productoEditar.categoria?.id || '');
    } else {
      setNombre('');
      setCategoriaId('');
    }
  }, [productoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('No hay token de autenticación');
      return;
    }

    const url = productoEditar
      ? `https://web-production-2486a.up.railway.app/api/productos/${productoEditar.id}/`
      : 'https://web-production-2486a.up.railway.app/api/productos/';
    const method = productoEditar ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          categoria_id: parseInt(categoriaId)
        })
      });

      if (response.ok) {
        setNombre('');
        setCategoriaId('');
        setProductoEditar(null);
        onProductoCreado(); // Refresca lista
      } else {
        throw new Error('Error al guardar producto');
      }

    } catch (err) {
      alert(err.message);
    }
  };

  if (!token) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h3>{productoEditar ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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

      <button type="submit">{productoEditar ? 'Guardar Cambios' : 'Crear'}</button>
      {productoEditar && (
        <button type="button" onClick={() => setProductoEditar(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default ProductoForm;
