// src/utils/authFetch.js

export const authFetch = async (url, options = {}, logoutCallback = () => {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const finalOptions = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, finalOptions);

    if (response.status === 401) {
      console.warn('[authFetch] Token inválido. Cerrando sesión automáticamente...');
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('user');
      logoutCallback(); // Redirecciona o recarga si se pasó función
      return null;
    }

    return response;
  } catch (err) {
    console.error('[authFetch] Error en fetch:', err);
    throw err;
  }
};
