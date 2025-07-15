import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Bienvenido a PRODEC 🌱</h1>
      <p>
        Plataforma diseñada para conectar agricultores y clientes de manera eficiente. 
        Aquí podrás registrar tus productos, crear ofertas y gestionar tu información de forma segura.
      </p>

      <div style={styles.links}>
        <Link to="/login-cliente" style={styles.button}>Soy Cliente</Link>
        <Link to="/login-agricultor" style={styles.button}>Soy Agricultor</Link>
        <Link to="/admin" style={styles.adminLink}>Acceso Interno</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f4f4f4',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  links: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  button: {
    backgroundColor: '#2d7a34',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  adminLink: {
    marginTop: '1rem',
    color: '#555',
    textDecoration: 'underline',
    fontSize: '0.9rem'
  }
};

export default Home;
