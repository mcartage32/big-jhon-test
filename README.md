# Big-Jhon-Test - Sistema de Gestión de Citas de Entrega

## 1. Descripción General

Desarrollo de una aplicación web fullstack para la gestión de citas de entrega de mercancía en una empresa de retail textil. La solución permite el registro, seguimiento y reporte de indicadores clave, aplicando una arquitectura desacoplada y robusta.

## 2. Arquitectura del Proyecto

El sistema sigue principios de **Clean Architecture** y **Diseño Orientado a Dominios (DDD)**, asegurando que la lógica de negocio sea independiente de los detalles de implementación.

### Diagrama de Arquitectura (ASCII)

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

### Arquitectura

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
