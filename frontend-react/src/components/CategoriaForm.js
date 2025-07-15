import React, { useState, useEffect } from 'react';

const CategoriaForm = ({ token, onCategoriaGuardada, categoriaEditar, setCategoriaEditar }) => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (categoriaEditar) {
      setNombre(categoriaEditar.nombre);
    } else {
      setNombre('');
    }
  }, [categoriaEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = categoriaEditar
      ? `https://web-production-2486a.up.railway.app/api/categorias/${categoriaEditar.id}/`
      : 'https://web-production-2486a.up.railway.app/api/categorias/';
    const method = categoriaEditar ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ nombre })
    });

    if (response.ok) {
      onCategoriaGuardada();
      setCategoriaEditar(null);
      setNombre('');
    } else {
      alert('Error al guardar categoría');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{categoriaEditar ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h3>
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <button type="submit">{categoriaEditar ? 'Guardar Cambios' : 'Crear'}</button>
      {categoriaEditar && (
        <button type="button" onClick={() => setCategoriaEditar(null)}>Cancelar</button>
      )}
    </form>
  );
};

export default CategoriaForm;
