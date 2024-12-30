# Frontend - Proyecto de Gestión de Tareas

Este es el frontend de la API de gestión de tareas. La aplicación está construida usando **React**, **TypeScript**, y **Vite**. Permite a los usuarios gestionar tareas, crear nuevas, marcarlas como completadas, y más.

## Tecnologías Usadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Superconjunto de JavaScript que añade tipado estático y otras características.
- **Vite**: Herramienta de construcción moderna y rápida para proyectos de frontend con React.
- **React Router**: Biblioteca para la gestión de rutas dentro de la aplicación.
- **Material-UI**: Biblioteca de componentes para la construcción de una interfaz de usuario moderna.
- **Axios**: Cliente HTTP para realizar solicitudes a la API backend.
- **JWT (JSON Web Token)**: Mecanismo de autenticación para acceder a rutas protegidas de la API.

## Estructura del Proyecto

La estructura de carpetas del proyecto está organizada de la siguiente manera:

- **`src/`**: Carpeta principal que contiene todo el código fuente de la aplicación.
  - **`clients/`**: Contiene archivos de configuración para el cliente. Ejemplo: `server.ts` para configurar y manejar la comunicación con la API.
  - **`component/`**: Carpeta donde se encuentran los componentes reutilizables de la aplicación.
  - **`context/`**: Contiene los contextos de React para manejar el estado global, como la autenticación del usuario y la gestión de tareas.
  - **`models/types/entities`**: Definiciones de tipos y entidades utilizadas en la aplicación, como los tipos de tareas y usuarios.
  - **`req/`**: Maneja las solicitudes HTTP y sus respuestas para las diferentes funcionalidades.
  - **`routes/`**: Carpeta con los archivos de rutas de la aplicación, como `AppRoutes.tsx` para la configuración de rutas principales.
  - **`services/`**: Contiene los servicios de la API para interactuar con el backend, como `TaskService` y `UserService`.
  - **`views/`**: Contiene las vistas de la aplicación divididas en dos carpetas:
    - **`private/`**: Vistas que requieren autenticación para ser accesadas.
    - **`public/`**: Vistas accesibles sin necesidad de autenticación.
  - **`app/`**: Archivo de configuración y lógica principal de la aplicación.
  - **`main/`**: El archivo de inicio que arranca la aplicación y configura el punto de entrada.

## Características

### 1. **Autenticación de Usuario**
- Los usuarios pueden iniciar sesión utilizando el correo electrónico y la contraseña pre-configurada.
- El usuario autenticado puede gestionar tareas asociadas a su cuenta.

### 2. **Gestión de Tareas**
- Crear nuevas tareas.
- Actualizar el estado de las tareas (completada o incompleta).
- Ver todas las tareas asociadas al usuario autenticado.
- Eliminar tareas.

### 3. **Interfaz de Usuario**
- La aplicación utiliza **Material-UI** para proporcionar una experiencia de usuario limpia y moderna.
- La aplicación tiene formularios y pantallas interactivas para gestionar las tareas de manera sencilla.

## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/csantander93/Task-Manager-Front.git
Instala las dependencias:

bash
Copiar código
npm install
Configura las variables de entorno: Asegúrate de crear un archivo .env en la raíz del proyecto y configura la URL de la API backend:

bash
Copiar código
VITE_API_URL=http://localhost:5000/api
Si la API está desplegada, usa la URL correspondiente.

Inicia el servidor de desarrollo:

bash
Copiar código
npm run dev
Esto ejecutará la aplicación en http://localhost:3000.

Desplegado
La aplicación ya se encuentra desplegada y disponible para pruebas directamente desde la web. Puedes acceder a la versión desplegada en el siguiente enlace:

URL de la aplicación: https://task-manager-front-nqqspayc2-csantander93s-projects.vercel.app/login
Usuario de Prueba
Importante: Las pruebas se deben realizar utilizando el siguiente usuario pre-cargado:

Correo electrónico: admin@admin.com
Contraseña: 123456
Este usuario es el único configurado en el sistema para realizar pruebas.

Iniciar sesión
Accede a la página de inicio de sesión: Login.
Introduce las siguientes credenciales de prueba:
Correo electrónico: admin@admin.com
Contraseña: 123456
Gestión de Tareas
Una vez que te hayas autenticado, podrás:

Ver todas las tareas asociadas al usuario.
Crear nuevas tareas.
Marcar tareas como completadas o incompletas.
Eliminar tareas.
Notas de Seguridad
Contraseña de prueba: La contraseña de prueba para el usuario admin@admin.com es 123456. No uses esta contraseña en producción.
Autenticación: La aplicación usa JWT para gestionar la autenticación. El token se almacena en el almacenamiento local del navegador para persistir la sesión mientras el usuario navega por la aplicación.

