# Hotel API — Examen Final Taller de Programación 2

API RESTful en Node.js + Express para gestionar las habitaciones de un hotel, con persistencia
intercambiable (MongoDB Atlas o archivo `database/database.json`) y login con JWT para proteger
las rutas de edición/borrado.

## Instalación

```bash
npm install
cp .env.example .env
```

## Variables de entorno (`.env`)

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `DB_PROVIDER` | `json` o `mongo` | `json` |
| `MONGODB_URI` | Cadena de conexión a MongoDB Atlas (solo si `DB_PROVIDER=mongo`) | - |
| `MONGODB_DB` | Nombre de la base de datos | `hotel_api` |
| `AUTH_USER` | Usuario válido para `POST /api/v1/auth/login` | `admin` |
| `AUTH_PASSWORD` | Contraseña válida para `POST /api/v1/auth/login` | `admin123` |
| `JWT_SECRET` | Secreto para firmar/verificar JWT | `supersecret` |
| `JWT_EXPIRES_IN` | Expiración de los tokens generados en el login | `1h` |

## Ejecución

### Modo JSON (sin base de datos)

```bash
# En .env: DB_PROVIDER=json
npm start
# o en modo desarrollo (recarga automática con --watch):
npm run dev
```

Las habitaciones se persisten en `database/database.json`.

### Modo MongoDB Atlas

```bash
# En .env:
# DB_PROVIDER=mongo
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net
# MONGODB_DB=hotel_api
npm start
```

La colección usada es `habitaciones`, dentro de la base indicada en `MONGODB_DB`. No se requiere
ningún cambio de código para alternar entre proveedores: basta con cambiar `DB_PROVIDER` en `.env`.

## Cómo obtener un JWT válido

No hay ABM de usuarios: las credenciales válidas se definen por `AUTH_USER` / `AUTH_PASSWORD`.

1. Pedir un token:

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Devuelve `{ "token": "<jwt>" }`. El token está firmado con `JWT_SECRET`, expira según
`JWT_EXPIRES_IN` (por defecto 1h) e incluye el `username` en el payload.

2. Usarlo en las rutas protegidas:

```
Authorization: Bearer <token>
```

Solo `PUT /api/v1/habitaciones/:id` y `DELETE /api/v1/habitaciones/:id` requieren autenticación.
Si el token falta, está vencido o es inválido, la API responde `401`.
