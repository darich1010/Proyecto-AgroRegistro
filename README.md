# 📦 PRODEC - Sistema Web para Clientes y Agricultores 🌾

## 📄 Resumen (Abstract)

El presente informe detalla el desarrollo de **PRODEC** (Proyecto de Comunicación Digital para el Agricultor), una plataforma web diseñada para optimizar la interacción entre agricultores y clientes mediante una solución tecnológica moderna, accesible y segura.

**PRODEC** forma parte del proyecto final **AgroRegistro**, implementado como una aplicación distribuida que integra tecnologías como **Django**, **React**, **PostgreSQL** (vía **Supabase**) y servicios en la nube como **Railway** y **Vercel**. El sistema permite el registro y autenticación de múltiples roles de usuario, habilitando funcionalidades específicas como gestión de productos, ofertas, solicitudes y notificaciones.

A lo largo del documento se describe la arquitectura técnica, las herramientas utilizadas, la lógica de negocio, el despliegue, y los beneficios del sistema en términos de transformación digital del sector agrícola peruano.

---

## 🧭 Introducción

El proyecto denominado **PRODEC** consiste en una aplicación web diseñada para facilitar la comunicación directa entre agricultores y clientes, permitiendo que ambos puedan registrarse y acceder al sistema según su rol correspondiente. Esta iniciativa surge como respuesta a la necesidad de modernizar el sector agrícola peruano, promoviendo una interacción eficiente, segura y directa entre los actores principales del mercado agrícola.

**PRODEC** se integra como una solución tecnológica dentro del proyecto final **AgroRegistro**, desarrollado como parte del curso de **Programación Web 2**. Su objetivo fundamental es ofrecer una plataforma digital de fácil acceso que permita a los agricultores gestionar sus productos y ofertas, mientras que los clientes pueden visualizar, solicitar e interactuar con dichas ofertas de forma personalizada. Asimismo, el sistema incluye la figura del administrador, quien supervisa y controla los distintos aspectos operativos de la plataforma.

Desde su concepción, **PRODEC** fue diseñado con una arquitectura robusta, utilizando herramientas modernas como **Django** y **Django REST Framework** para el backend, **React JS** para el frontend y **PostgreSQL** como motor de base de datos, desplegado a través de **Supabase**. El despliegue completo se realizó utilizando plataformas como **Railway** (para el backend) y **Vercel** (para el frontend), garantizando disponibilidad en la nube, acceso remoto y escalabilidad.

El presente documento está estructurado para brindar una visión detallada del proceso de desarrollo del sistema. Incluye la descripción técnica de la base de datos, la configuración de las rutas API, la lógica de autenticación basada en JWT, el manejo de roles y permisos, el diseño de componentes en React, así como la documentación de las herramientas y servicios utilizados durante el ciclo de desarrollo.

Además, se presentan enlaces públicos de acceso, credenciales de prueba, capturas de pantalla y otros recursos que permiten validar el cumplimiento de los criterios definidos en la rúbrica del curso. Con esta iniciativa, se busca aportar una solución funcional y replicable que promueva el desarrollo sostenible del agro a través de la transformación digital.

---


## 📁 Estructura General del Proyecto

```
AgroRegistro/
├── backend-django/              # Proyecto backend con Django y Django REST Framework
├── frontend-react/              # Interfaz de usuario desarrollada en React.js
├── BACKUPS CSV/                 # Respaldo de tablas de la base de datos en formato CSV
├── INFORME_FINAL_DE_PROYECTO PW2/  # Informe final en formato LaTeX (IEEE)
├── README.md                    # Documentación principal del proyecto 
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

- URL de exposición de diapositivas para teoría (20 min - ambos integrantes) solicitado para laboratorio: https://www.youtube.com/watch?v=PIenblHjS3Q

- URL del video (20 min) de funcionalidad solicitado para teoría: https://www.youtube.com/watch?v=_n8g8Nbzea4&t=631s

- URL del video (7 min - ambos integrantes) solicitado para laboratorio: https://www.youtube.com/watch?v=REN2Ui6GMBs




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
