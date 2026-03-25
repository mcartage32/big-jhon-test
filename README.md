# Big-Jhon-Test - Sistema de Gestión de Citas de Entrega - (React + Django + PostgreSQL)

## 1. Descripción General

Desarrollo de una aplicación web fullstack para la gestión de citas de entrega de mercancía en una empresa de retail textil. La solución permite el registro, seguimiento y reporte de indicadores clave, aplicando una arquitectura desacoplada y robusta.

## 2. Arquitectura del Proyecto

El sistema sigue principios de **Clean Architecture** y **Diseño Orientado a Dominios (DDD)**, asegurando que la lógica de negocio sea independiente de los detalles de implementación.

### Diagrama de Arquitectura

```text
      +-------------------------------------------------------------+
      |                       USUARIO / BROWSER                     |
      +------------------------------+------------------------------+
                                     |
                                     v
      +-------------------------------------------------------------+
      |                 FRONTEND (React + Vite + Bun)               |
      |  +------------+      +------------+      +---------------+  |
      |  | Components | <--> |   Hooks    | <--> | API (Axios/RQ)|  |
      |  +------------+      +------------+      +---------------+  |
      +------------------------------+------------------------------+
                                     | (REST API / JWT)
                                     v
      +-------------------------------------------------------------+
      |               BACKEND (Django REST Framework)               |
      |  +-------------------------------------------------------+  |
      |  | Presentation (Views, Serializers, Endpoints)          |  |
      |  +---------------------------+---------------------------+  |
      |                              |                              |
      |  +---------------------------v---------------------------+  |
      |  | Application (Use Cases, Services)                     |  |
      |  +---------------------------+---------------------------+  |
      |                              |                              |
      |  +---------------------------v---------------------------+  |
      |  | Domain (Entities, Business Logic)                     |  |
      |  +---------------------------+---------------------------+  |
      |                              |                              |
      |  +---------------------------v---------------------------+  |
      |  | Infrastructure (PostgreSQL, ORM, Raw SQL)             |  |
      |  +-------------------------------------------------------+  |
      +-------------------------------------------------------------+
```

### Estructura de carpetas y archivos

```text
BIG-JHON-TEST/
├── backend/
│   ├── appointments/           # Módulo de Citas (DDD)
│   │   ├── application/        # Casos de uso
│   │   ├── domain/             # Entidades y lógica de negocio
│   │   ├── infrastructure/     # Repositorios y persistencia
│   │   ├── management/         # Comandos de gestión (Seeders)
│   │   ├── migrations/         # Migraciones de BD
│   │   ├── presentation/       # API Views y Serializers
│   │   ├── tests/              # Pruebas unitarias
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── docs.yaml           # Documentación OpenAPI específica
│   │   └── models.py
│   ├── config/                 # Configuración del core de Django
│   ├── users/                  # Módulo de Autenticación y Usuarios
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── management/
│   │   ├── migrations/
│   │   ├── presentation/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── docs.yaml
│   │   └── models.py
│   ├── dockerfile
│   ├── manage.py
│   ├── pyproject.toml          # Configuración de dependencias (uv)
│   ├── requirements.txt
│   └── uv.lock
├── frontend/
│   ├── public/                 # Activos estáticos
│   ├── src/
│   │   ├── api/                # Cliente Axios y React Query
│   │   │   ├── reactQuery/
│   │   │   ├── axiosConfig.ts
│   │   │   └── endpoints.ts
│   │   ├── components/         # Componentes UI reutilizables
│   │   ├── constants/          # Enums y rutas constantes
│   │   ├── containers/         # Layouts y Páginas (Vistas)
│   │   │   ├── layout/
│   │   │   └── pages/
│   │   ├── hooks/              # Hooks personalizados (useAuth)
│   │   ├── interfaces/         # Definiciones de TypeScript
│   │   ├── router/             # Configuración de rutas y Guards
│   │   │   ├── PrivateRoute.tsx
│   │   │   └── routes.tsx
│   │   ├── main.scss           # Estilos globales
│   │   └── main.tsx            # Punto de entrada
│   ├── bun.lock                # Lockfile de Bun
│   ├── dockerfile
│   ├── eslint.config.js        # Linter de Frontend
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json           # Configuración de TypeScript
│   └── vite.config.ts
├── docker-compose.yml          # Orquestación de servicios
└── README.md
```

## 3. Diagrama Entidad-Relación (MER)
El diagrama se encuentra disponible en la raíz del proyecto como `Diagrama-MER.png`. Cabe resaltar que dicho MER solo tiene en cuenta las tablas usadas en el proyecto. Al crear la base de datos, aparecen otras tablas que Django crea por defecto pero no son usadas en esta solución. A continuación se comparte un link para revisar dicho MER más a detalle. [Documentación MER en dbdocs](https://dbdocs.io/mcartage33/big-jhon-test)


![Logo](Diagrama-MER.png)

## 4. Consideraciones Generales
- El frontend corre por defecto en el puerto **5173** y el backend en el puerto **8000**.

**Requisitos previos:**
- Docker y Docker Compose (recomendado para ejecución rápida).
- Python 3.12+ y `uv` (para ejecución local del backend).
- Node.js 20+ y Bun (para ejecución local del frontend).

### 4.1 Dependencias Utilizadas

### Backend
- **Django 6.0.3**: Framework principal de desarrollo web.
- **Django REST Framework 3.17.0**: Toolkit para crear APIs REST.
- **djangorestframework-simplejwt 5.5.1**: Autenticación basada en JWT para APIs.
- **drf-spectacular 0.29.0**: Generación automática de documentación OpenAPI/Swagger.
- **PostgreSQL**: Base de datos relacional utilizada por el proyecto.
- **django-cors-headers 4.9.0**: Manejo de CORS para permitir solicitudes desde el frontend.
- **APITestCase**: Para pruebas unitarias de las APIs con Django REST Framework.

### Frontend
- **React 18 & Vite**: Librería de UI y herramienta de construcción rápida.
- **Bun**: Tiempo de ejecución y gestor de paquetes.
- **React Query (TanStack)**: Gestión de estado asíncrono y caché de API.
- **Axios**: Cliente HTTP para comunicación con el backend.
- **Ant Design**: Framework de estilos para diseño responsive.
- **Otras librerías importantes**:
  - **@ant-design/icons 6.1.0**: Íconos para Ant Design.
  - **chart.js 4.5.1** y **react-chartjs-2 5.3.1**: Gráficos y visualización de datos.
  - **date-fns 4.1.0** y **dayjs 1.11.20**: Manipulación y formateo de fechas.
  - **react-icons 5.6.0**: Colección de íconos para React.
  - **react-router-dom 7.13.2**: Enrutamiento en React.

## 5. Instalación y Ejecución

### Opción 1: Con Docker (Recomendado)
Desde la raíz del proyecto, ejecuta el siguiente comando para levantar la base de datos, el backend y el frontend automáticamente:

```bash
docker compose up --build
```

### Opción 2: Ejecución Local
#### Backend **(Nota: asegurate previamente que PostgresSQL este corriendo localmente en el puerto 5432)**
1. Navega al directorio del backend:
```bash
cd /backend
```
2. Instala dependencias
```bash
uv sync
```
ó
```bash
uv pip install -r requirements.txt
```
3. Crea las migraciones y correlas
```bash
uv run python manage.py makemigrations
```
```bash
uv run python manage.py migrate
```
4. Ejecuta las semillas
```bash
uv run python manage.py seed_users
```
```bash
uv run python manage.py seed_appointments
```
5. Ejecuta el servidor
```bash
uv run python manage.py runserver
```

### Frontend
1. Navega al directorio del frontend:
```bash
cd /frontend
```
2. Instala dependencias
```bash
bun install
```
3. Inicia el servidor de desarrollo
```bash
bun dev
```
## 6. Variables de entorno requeridas

Crea un archivo `.env` en las carpetas respectivas basándote en los ejemplos proporcionados. Tanto la carpeta del backend como la del frontend incluyen un archivo `.env.example` con los valores de referencia de las variables de entorno.

**Backend (`/backend/.env`)**:
```env
DB_NAME=nombre_de_tu_base
DB_USER=usuario
DB_PASSWORD=contraseña
DB_HOST=host
DB_PORT=numero_puerto
```
> **Nota:** Si ejecutas el backend desde Docker, el valor de `DB_HOST` debe ser `"db"`.  
> Si lo ejecutas de manera local, el valor debe ser `"localhost"`.

**Frontend (`/frontend/.env`)**:
```env
VITE_API_URL=url_del_API
```

## 7. Documentación de la API

Una vez iniciado el backend, puedes acceder a la documentación interactiva en:

- **Swagger UI:** [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

## 8. Cómo correr las pruebas unitarias

Las pruebas unitarias se realizaron en el backend para el módulo de citas. Se utilizó `APITestCase` para validar el flujo completo.

### Ejecutar pruebas con Docker

Desde la raíz del proyecto ejecuta:

```bash
docker compose exec backend python manage.py test appointments
```
### Ejecutar pruebas de manera local

Ubícate en la carpeta del backend y ejecuta:

```bash
uv run python manage.py test appointments
```

## 9. Decisiones técnicas y justificaciones relevantes

### 1. Arquitectura tipo DDD ligero (inspiración hexagonal)
Se organizó el código en capas:

- `domain`: modelos y enums
- `application`: lógica de negocio (services, validators)
- `infrastructure`: queries/repositorios
- `presentation`: serializers, views, urls

**Justificación:**
- Separa responsabilidades claramente.
- Facilita escalabilidad y mantenimiento.
- Evita acoplamiento entre lógica de negocio y framework.

---

### 2. Uso de Custom User Model (email como identificador)
Se implementó un modelo de usuario personalizado usando email en lugar de username.
```python
AUTH_USER_MODEL = "users.User"
```
### 3. Autenticación con JWT
Se implementó autenticación basada en tokens JWT (access y refresh), en lugar de autenticación por sesiones, como tambien la implementación de blacklist de tokens

**Justificación:**

- Permite una autenticación **stateless**, eliminando la necesidad de almacenar sesiones en el servidor.
- Es ideal para arquitecturas con frontend desacoplado (SPA, mobile apps).
- Reduce la carga en el backend al no tener que gestionar sesiones activas.
- El **access token** tiene corta duración, reduciendo el riesgo en caso de compromiso.
- El **refresh token** permite renovar la sesión sin requerir reautenticación constante.
- Permite invalidar tokens antes de su expiración (logout seguro).
- Evita que un refresh token comprometido pueda seguir generando nuevos access tokens.
- Agrega una capa adicional de control sobre sesiones activas.

En conjunto, esta estrategia balancea seguridad, escalabilidad y experiencia de usuario, alineándose con prácticas modernas en el desarrollo de APIs.

---

### 4. Validaciones en capa de aplicación
Las reglas de negocio se implementaron en `services` y `validators`, no en las views.

**Justificación:**
- Mantiene las views simples y limpias.
- Centraliza la lógica de negocio.
- Facilita testing y reutilización del código.

---

### 5. Documentación desacoplada por app (OpenAPI)
Cada app define su documentación en archivos separados:

```
users/docs.yaml
appointments/docs.yaml
```

**Justificación:**
- Organización por dominio.
- Escalable para equipos grandes.
- Similar a prácticas usadas en entornos profesionales.

---

### 6. Exposición de enums como endpoints (catálogos)
Se crearon endpoints para listar valores de enums como proveedores, estados y líneas de producto.

**Justificación:**
- Evita hardcodeo en el frontend.
- Permite cambios dinámicos desde backend.
- Mejora desacoplamiento entre frontend y backend.

---

### 8. Uso de PostgreSQL como base de datos
Se utilizó PostgreSQL como motor de base de datos.

**Justificación:**
- Por recomendación de la prueba.
- Mayor robustez y confiabilidad.
- Mejor manejo de relaciones.
- Preparado para entornos productivos.

---

### 9. Uso de scripts de seed para datos de prueba
Se crearon comandos personalizados para poblar la base de datos:

```python
python manage.py seed_users
python manage.py seed_appointments
```

**Justificación:**
- Permite cargar datos rápidamente.
- Facilita pruebas funcionales.
- Cumple con los requisitos de la prueba técnica.

---

### 10. Uso de APITestCase para pruebas
Se implementaron pruebas usando APITestCase.

**Justificación:**
- Permite probar endpoints completos (request/response).
- Valida autenticación y reglas de negocio en conjunto.
- Es adecuado para APIs REST.

---

### 11. Normalización y validación de fechas
Se implementó lógica para:
- evitar fechas en el pasado
- asignar hora por defecto (8:00 AM)
- validar consistencia con `delivered_at`

**Justificación:**
- Garantiza integridad de los datos.
- Evita inconsistencias en el negocio.
- Cumple reglas definidas en la prueba.

---

### 12. Uso de Bun y uv
Se utilizaron herramientas modernas como Bun (para el frontend) y uv (para la gestión de dependencias en Python).

**Justificación:**

- **Uso de uv (Python):**
  - Permite una instalación de dependencias significativamente más rápida que pip.
  - Mejora la experiencia de desarrollo al reducir tiempos de setup.
  - Facilita la creación y gestión de entornos virtuales de forma eficiente.
  - Se utilizó principalmente en desarrollo local para optimizar productividad.

- **Uso de Bun (Frontend):**
  - Ofrece un gestor de paquetes y runtime más rápido que Node.js tradicional.
  - Reduce tiempos de instalación y ejecución del frontend.
  - Mejora la experiencia del desarrollador en proyectos modernos.

- **Separación de responsabilidades (uv vs Docker):**
  - uv se utiliza en desarrollo local.
  - En Docker se utilizan herramientas más estándar (pip) para evitar recreación de entornos en runtime y asegurar estabilidad.

## 10. Supuestos asumidos durante el desarrollo

Durante el desarrollo de la solución se asumieron las siguientes condiciones:

---

### 1. Credenciales de usuarios de prueba
Se incluyeron usuarios predefinidos mediante scripts de seed para facilitar pruebas:

```
admin@test.co
admin123

user1@test.co
user123

user2@test.co
user123
```
---

### 2. Entorno de desarrollo
Se asume que el entorno cuenta con:

- Python 3.12+
- PostgreSQL
- Docker y Docker Compose
- Bun (para frontend)
- uv (gestión de dependencias en Python)

---

### 3. Uso de Docker como entorno principal
Se asume que el proyecto será ejecutado mediante Docker.

---

### 4. Manejo de zona horaria
Se asume uso de zona horaria de Colombia (UTC-5).

---

### 5. Reglas de negocio definidas
Se implementaron según lo especificado en la prueba:

- No se permiten citas en el pasado.
- El estado "Entregada" requiere `delivered_at`.
- No se permite cambiar de "Entregada" a "Programada".
- Las citas canceladas no aparecen en listados.

---

### 6. Autenticación requerida
Todos los endpoints (excepto login y registro) requieren autenticación.

---

### 7. Volumen de datos
Se generan datos de prueba limitados:

- 3 usuarios
- 20 citas
- No se requiere optimización para grandes volúmenes de datos.
- La paginación implementada es suficiente para el alcance de la prueba.

---

### 8. Uso de enums como catálogo cerrado

- Los valores de proveedor, estado y línea de producto están definidos como enums.
- No se requiere gestión dinámica (CRUD) de estos valores.
- Son catálogos fijos definidos por el negocio.

---

### 9. Roles y permisos de usuarios
No se implementó un sistema de roles o permisos diferenciados.

**Supuesto:**
- Todos los usuarios autenticados tienen acceso a las mismas funcionalidades.
- No se requiere control de acceso granular (por ejemplo, restricciones por rol como admin o usuario).
- Esta decisión se tomó para simplificar la implementación y enfocar el desarrollo en la lógica principal del negocio.

**Nota:**
- En caso de requerirse, este módulo puede extenderse fácilmente utilizando el sistema de permisos de Django o librerías como django-guardian.
