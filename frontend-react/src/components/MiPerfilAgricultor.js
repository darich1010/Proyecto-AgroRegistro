import React, { useEffect, useState } from 'react';

const MiPerfilAgricultor = ({ token }) => {
  const [agricultor, setAgricultor] = useState(null);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    const fetchAgricultor = async () => {
      if (!token || !userId) return;

      try {
        const res = await fetch('https://web-production-2486a.up.railway.app/api/agricultores/', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const data = await res.json();
        const encontrado = data.find(a => a.usuario.id === userId);

        if (encontrado) {
          setAgricultor(encontrado);
        } else {
          setError('No se encontró el agricultor correspondiente.');
        }
      } catch (err) {
        console.error('Error al obtener agricultor:', err);
        setError('❌ Error al cargar los datos del agricultor.');
      }
    };

    fetchAgricultor();
  }, [token, userId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!agricultor) return <p>Cargando tus datos...</p>;

  return (
    <div style={styles.card}>
      <h3>👨‍🌾 Mi Perfil</h3>
      <p><strong>Nombre:</strong> {agricultor.nombre}</p>
      <p><strong>Teléfono:</strong> {agricultor.telefono}</p>
      <p><strong>Departamento:</strong> {agricultor.departamento}</p>
      <p><strong>Provincia:</strong> {agricultor.provincia}</p>
      <p><strong>Distrito:</strong> {agricultor.distrito}</p>
    </div>
  );
};

const styles = {
  card: {
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '2rem'
  }
};

export default MiPerfilAgricultor;
