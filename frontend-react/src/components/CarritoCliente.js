import React from 'react';

const CarritoCliente = ({ carrito, eliminarDelCarrito }) => {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div style={styles.carrito}>
      <h3>🛍️ Mi Carrito</h3>
      {carrito.length === 0 ? (
        <p>No has añadido productos aún.</p>
      ) : (
        <>
          <ul>
            {carrito.map((item, index) => (
              <li key={index} style={styles.item}>
                <strong>{item.producto.nombre}</strong> (x{item.cantidad})<br />
                Precio unitario: S/ {item.precio}<br />
                Total: S/ {(item.precio * item.cantidad).toFixed(2)}<br />
                <button onClick={() => eliminarDelCarrito(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p><strong>Total del carrito: S/ {total.toFixed(2)}</strong></p>
          <button disabled>Finalizar compra (pendiente)</button>
        </>
      )}
    </div>
  );
};

const styles = {
  carrito: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f2f2f2',
    borderRadius: '10px'
  },
  item: {
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    paddingBottom: '0.5rem'
  }
};

export default CarritoCliente;
