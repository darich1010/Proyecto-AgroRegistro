import React, { useEffect, useState } from 'react';
import CategoriaForm from './CategoriaForm';

const CategoriaList = ({ token }) => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [categoriaEditar, setCategoriaEditar] = useState(null);

  const fetchCategorias = async () => {
    try {
      const res = await fetch('https://web-production-2486a.up.railway.app/api/categorias/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al obtener categorías');
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      setError('Error al cargar categorías: ' + err.message);
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta categoría?')) return;

    const res = await fetch(`https://web-production-2486a.up.railway.app/api/categorias/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      fetchCategorias();
    } else {
      alert('Error al eliminar categoría');
    }
  };

  useEffect(() => {
    if (token) fetchCategorias();
  }, [token]);

  if (!token) return null;

  return (
    <div>
      <h2>Lista de Categorías</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.nombre}
            <button onClick={() => setCategoriaEditar(categoria)}>Editar</button>
            <button onClick={() => eliminarCategoria(categoria.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <CategoriaForm
        token={token}
        onCategoriaGuardada={fetchCategorias}
        categoriaEditar={categoriaEditar}
        setCategoriaEditar={setCategoriaEditar}
      />
    </div>
  );
};

export default CategoriaList;
