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
| 🌍 Frontend Web | https://agroregistro-front.vercel.app |
| 🛠️ Backend API, sin una vista general 404  | https://agroregistro-backend.up.railway.app |, pero con funcionamiento correcta tanto en admin como en api en : | https://web-production-2486a.up.railway.app/admin/ | , | https://web-production-2486a.up.railway.app/api/ |
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

### Autoevaluación (Darío Cornejo)

## Darío Cornejo Hurtado:

**Responsabilidad:** Cumplí con todas las tareas asignadas, tanto en el backend como en la conexión con el frontend. Subí a tiempo el código a GitHub y me aseguré de que la base de datos estuviera poblada correctamente.

**Proactividad:** Implementé características adicionales no pedidas como el sistema de notificaciones al agricultor y estructura modular de modelos.

**Aporte al grupo:** Coordiné el despliegue en Railway y Vercel, asistí con bugs en el frontend, orienté a mi compañero sobre la lógica de roles y ayudé a estructurar el informe.

**Evaluación de compañeros:** Realicé la calificación completa a mis compañeros según lo requerido.

> Nota individual considerada: **20/20** , Nota a mi compañero considerada: **20/20**

### Diego Cervantes Apaza:

**Responsabilidad:** Cumplí con todas las tareas asignadas,principlamente en el frontend y me aseguré de que la base de datos estuviera correctamente implementada.

**Proactividad:** Implementé manejo inteligente del carrito con lógica de stock.

**Aporte al grupo:** Me encargue de la conexión correcta con Supabase y asistí con bugs en el frontend y ayudé a estructurar el informe.

**Evaluación de compañeros:** Realicé la calificación completa a mis compañeros según lo requerido.

> Nota individual considerada: **20/20** , Nota a mi compañero considerada: **20/20**

---



## ✍️ Autores y Créditos

| Nombre | Rol | 
|-------|-----|
| Dario Cornejo Hurtado | Desarrollo FullStack , estructura modular, integración con Supabase y lógica de negocio diferenciada por usuario. | 
| Diego Cervantes Apaza | Desarrollo FullStack, documentación, despliegue |

---

_Espero les guste la página y muchas gracias._
