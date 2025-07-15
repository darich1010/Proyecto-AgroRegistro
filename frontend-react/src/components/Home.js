import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Bienvenido a PRODEC 🌱</h1>
      <p>
        Plataforma diseñada para conectar agricultores y clientes de manera eficiente. Aquí podrás registrar tus productos, crear ofertas y gestionar tu información de forma segura.
      </p>

      <div style={styles.buttons}>
        <button onClick={() => navigate('/login-cliente')}>Soy Cliente</button>
        <button onClick={() => navigate('/login-agricultor')}>Soy Agricultor</button>
        <button onClick={() => navigate('/admin')}>Acceso Interno</button>
        <p style={{ marginTop: '1rem' }}>
          ¿No tienes cuenta?{' '}
          <button onClick={() => navigate('/registro-cliente')} style={styles.linkButton}>Registrarse como Cliente</button>
          {' '}|{' '}
          <button onClick={() => navigate('/registro-agricultor')} style={styles.linkButton}>Registrarse como Agricultor</button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '2rem',
    alignItems: 'center'
  },
  linkButton: {
    border: 'none',
    background: 'none',
    color: '#0066cc',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

export default Home;
