// src/components/agricultor/NotificacionesAgricultorList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificacionesAgricultorList = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const token = localStorage.getItem('access'); // JWT token

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/notificaciones/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotificaciones(response.data);
        console.log("🔔 Notificaciones recibidas:", response.data);
      } catch (error) {
        console.error("❌ Error al obtener notificaciones:", error);
      }
    };

    fetchNotificaciones();
  }, [token]);

  if (!notificaciones.length) {
    return <p className="text-center mt-4">No tienes notificaciones nuevas.</p>;
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-700">🔔 Tus Notificaciones</h2>
      <ul className="space-y-3">
        {notificaciones.map((noti) => (
          <li key={noti.id} className="border p-3 rounded-lg bg-green-50">
            <p className="font-medium">{noti.mensaje}</p>
            <p className="text-sm text-gray-600">🧑 Cliente: {noti.cliente?.nombre}</p>
            <p className="text-sm text-gray-600">📦 Producto: {noti.oferta?.producto?.nombre}</p>
            <p className="text-xs text-gray-400">🕒 {new Date(noti.fecha_creacion).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificacionesAgricultorList;
