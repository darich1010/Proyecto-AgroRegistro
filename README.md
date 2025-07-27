# 📦 PRODEC - Sistema Web para Clientes y Agricultores 🌾
Hola¡, bienvenido al repositorio de nuestro proyecto final del proyecto AgroRegistro que implmentamos para la gestión y la comunicación entre clientes y agricultores de manera directa y desde la wep, como una innovación hacia la modernización del ambito agrícola y el propósito de poder implmentarse de manera extendida en un futuro no muy lejano. Este documento explica la estructura general del proyecto, las URLs públicas para su uso y prueba, los videos, capturas y demás recursos exigidos en la rúbrica del curso.

---

## 📁 Estructura General del Proyecto

```
AgroRegistro/
├── backend/              # Proyecto Django (API REST)
├── frontend-react/       # Interfaz desarrollada con React.js
├── entregables/          # INFORME, videos, capturas, PDF y README final
│   ├── README.md         # Este archivo│   
│   ├── Informe_Final.pdf
│   ├── capturas/
│   ├── videos/
│   └── exposicion/
└── README.md             # (opcional en raíz del proyecto)
```

---

## 🌐 URLs Públicas y Accesos

| Componente | Enlace |
|-----------|--------|
| 🌍 Frontend Web | https://agroregistro-frontend.vercel.app/ |
| 🛠️ Backend API, sin una vista general 404  | https://agroregistro-backend.up.railway.app |
| 🛠️ Backend API, con funcionamiento correcto en admin  | https://web-production-2486a.up.railway.app/admin/ |
| 🛠️ Backend API,  con funcionamiento correcto en api  | https://web-production-2486a.up.railway.app/api/ |
| 📂 Repositorio GitHub | https://github.com/usuario/AgroRegistro |

🔐 **Credenciales de prueba:**

- Usuario **Administrador**: `admin` / `1234`
- Usuario **Cliente de prueba**: `cliente01` / `1234`
- Usuario **Agricultor de prueba**: `agricultor01` / `1234`

---

## 🛠️ Tecnologías Usadas

- **Frontend**: React.js, Axios, Tailwind CSS
- **Backend**: Django REST Framework, JWT Authentication
- **Base de Datos**: PostgreSQL (Supabase)
- **Hosting**: Vercel (frontend), Railway (backend)
- **Dominio HTTPS**: Asegurado por las plataformas de despliegue

---

## 📄 Contenido de la Carpeta `entregables/`

| Archivo | Descripción |
|--------|-------------|
| `README.md` | Este documento explicativo del proyecto y entregables |
| `README.pdf` | Versión PDF con formato para entrega final |
| `Informe_Final.pdf` | Documento completo con evidencias, análisis, pantallazos |
| `capturas/` | Carpeta con capturas de las interfaces web y funcionalidades |
| `videos/` | Demostraciones funcionales (core business, frontend/backend) |
| `exposicion/` | Video de exposición del grupo, con presentación de diapositivas |

---

## 🎯 Funcionalidades Clave por Rol

### 👤 Cliente
- Registro e inicio de sesión
- Visualización de ofertas disponibles
- Añadir productos al carrito (con descuento de stock)
- Publicar solicitudes de productos
- Ver respuestas de agricultores

### 👨‍🌾 Agricultor
- Crear y gestionar ofertas propias
- Ver solicitudes de productos
- Responder a solicitudes
- Recibir notificaciones automáticas si un cliente añade su producto al carrito

### 🔐 Administrador
- Acceso al panel admin de Django para CRUD completo

---

## 🔄 AJAX / Operaciones Asíncronas

- Registro e inicio de sesión vía JWT (tokens)
- Añadir productos al carrito (asíncrono)
- Envío y respuesta de solicitudes entre cliente y agricultor
- Notificaciones generadas automáticamente al backend

---

## Respaldo de Base de Datos

### ¿Por qué realizar un respaldo?

Realizar un respaldo (backup) de la base de datos es una práctica fundamental para cualquier proyecto que maneje información importante. El respaldo permite proteger los datos ante posibles fallos, pérdidas accidentales, errores humanos o problemas técnicos. Contar con copias actualizadas de la base de datos asegura que el proyecto pueda recuperarse rápidamente y continuar funcionando sin pérdida significativa de información.

### Método y procedimiento utilizado

Para el proyecto AgroRegistro, se decidió realizar el respaldo exportando cada tabla de la base de datos en formato CSV. Este método es sencillo, portátil y compatible con múltiples herramientas y sistemas, facilitando la restauración o análisis posterior.

El procedimiento realizado fue el siguiente:

1. Ingresamos a la plataforma de administración de la base de datos (Supabase).
2. Para cada tabla principal, utilizamos la opción de exportar datos en formato Excel.
3. Convertimos los archivos Excel a CSV para cumplir con los requisitos del curso.
4. Se almacenaron todos los archivos CSV en una carpeta organizada llamada `BACKUPS CSV`.
5. Finalmente, estos archivos se subieron al repositorio del proyecto para mantenerlos accesibles y versionados.

### Archivos de respaldo y su contenido

| Nombre del archivo               | Contenido principal                                                         |
|---------------------------------|----------------------------------------------------------------------------|
| `api_agricultor.csv`             | Información personal y de contacto de los agricultores registrados.         |
| `api_carritoitem.csv`            | Detalles de los productos agregados al carrito de cada cliente.             |
| `api_categoria.csv`              | Categorías bajo las cuales se clasifican los productos.                     |
| `api_cliente.csv`                | Datos personales y de contacto de los clientes registrados.                 |
| `api_notificacionagricultor.csv`| Notificaciones enviadas a los agricultores sobre solicitudes y mensajes.    |
| `api_oferta.csv`                 | Ofertas creadas por los agricultores con precios y detalles de productos.   |
| `api_producto.csv`               | Detalles de los productos disponibles en la plataforma.                     |
| `api_respuestasolicitud.csv`    | Respuestas proporcionadas por los agricultores a solicitudes de clientes.   |
| `api_solicitudproducto.csv`     | Solicitudes realizadas por los clientes para productos específicos.         |
| `api_usuario.csv`               | Información general de los usuarios del sistema (roles, credenciales, etc). |
| `auth_permission.csv`            | Permisos definidos para los roles de usuarios.                              |
| `django_content_type.csv`        | Información técnica interna del framework Django para los modelos.          |

### Ubicación de los archivos

Todos los archivos de respaldo están organizados y almacenados en la carpeta llamada `BACKUPS CSV` dentro del repositorio principal del proyecto. Esta estructura facilita su acceso y mantenimiento, asegurando que se pueda localizar rápidamente en caso de ser necesario restaurar o analizar la base de datos.

---

Se recomienda realizar respaldos periódicos y mantener actualizados estos archivos para preservar la integridad y disponibilidad de la información del proyecto.


---

## ✨ Trabajo Adicional / Proactividad

Durante el desarrollo del sistema AgroRegistro, se implementaron ciertas funcionalidades y enfoques no requeridos explícitamente por los entregables, que representan aportes técnicos adicionales e innovaciones por iniciativa propia:

    ✅ Modelos adicionales: Se crearon modelos extra no incluidos en los requisitos básicos:

        CarritoItem para gestionar el carrito de compras con descuento automático de stock.

        NotificacionAgricultor para avisos automáticos a los agricultores cuando se agregan productos al carrito.

    ✅ Uso de Supabase como base de datos remota (PostgreSQL), gestionando de forma externa los registros con persistencia en la nube. Esta solución no fue requerida, pero se implementó para mayor escalabilidad.

    ✅ Estructura modular avanzada en Django, separando modelos, vistas y serializadores en carpetas específicas para mejorar el mantenimiento del código (estructura profesional no solicitada).

    ✅ Autenticación y autorización diferenciada con JWT, redireccionando a cada tipo de usuario a su panel respectivo (cliente, agricultor, admin), mejorando así la experiencia de usuario y seguridad.

    ✅ Notificaciones automáticas asíncronas, lo que representa un uso avanzado de lógica de backend para enriquecer la interacción entre usuarios.

---

## 🧠 Modelo de Datos (Diagrama Entidad-Relación)

Incluido en el informe PDF, representando entidades como:

- Usuario (personalizado)
- Cliente
- Agricultor
- Producto
- Categoría
- Oferta
- CarritoItem
- SolicitudProducto
- RespuestaSolicitud
- NotificacionAgricultor

--- 

## Videos de funcionalidad de la WebApp

- URL del video (20 min) solicitado para teoría: https://www.youtube.com/watch?v=_n8g8Nbzea4&t=631s

- URL del video (5 min - ambos integrantes) solicitado para laboratorio: 


---

### Autoevaluación (Darío Cornejo),Grupo de Teoría: A , Grupo de Laboratorio: D

## Darío Cornejo Hurtado:

**Responsabilidad:** Cumplí con todas las tareas asignadas, tanto en el backend como en la conexión con el frontend. Subí a tiempo el código a GitHub y me aseguré de que la base de datos estuviera poblada correctamente.

**Proactividad:** Implementé características adicionales no pedidas como el sistema de notificaciones al agricultor y estructura modular de modelos.

**Aporte al grupo:** Coordiné el despliegue en Railway y Vercel, asistí con bugs en el frontend, orienté a mi compañero sobre la lógica de roles y ayudé a estructurar el informe.

**Evaluación de compañeros:** Realicé la calificación completa a mis compañeros según lo requerido.

> Nota individual considerada: **20/20** , Nota a mi compañero considerada: **20/20**,**100%**,

### Diego Cervantes Apaza,Grupo de Teoría: A , Grupo de Laboratorio: D

**Responsabilidad:** Cumplí con todas las tareas asignadas,principlamente en el frontend y me aseguré de que la base de datos estuviera correctamente implementada.

**Proactividad:** Implementé manejo inteligente del carrito con lógica de stock.

**Aporte al grupo:** Me encargue de la conexión correcta con Supabase y asistí con bugs en el frontend y ayudé a estructurar el informe.

**Evaluación de compañeros:** Realicé la calificación completa a mis compañeros según lo requerido.

> Nota individual considerada: **20/20** , Nota a mi compañero considerada: **20/20**,**100%**,

---



## ✍️ Autores y Créditos

| Nombre | Rol | 
|-------|-----|
| Dario Cornejo Hurtado | Desarrollo FullStack , estructura modular, integración con Supabase y lógica de negocio diferenciada por usuario. | 
| Diego Cervantes Apaza | Desarrollo FullStack, documentación, despliegue |

---

_Espero les guste la página y muchas gracias._
