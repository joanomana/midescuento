# 🛒 Descuentos App
## Aplicación web para visualizar, filtrar y explorar productos con grandes descuentos obtenidos desde el scraper de Éxito y otras fuentes.
Los datos se almacenan en MongoDB y se consultan en tiempo real para mostrar siempre los precios más recientes.

## 📌 Características
- Listado en tiempo real de productos con descuentos.

- Filtros avanzados:

  - Por categoría

  - Por porcentaje mínimo de descuento

  - Por texto (nombre, marca, categoría)

  - Ordenar por precio o por descuento

- Visualización clara:

  - Precio original tachado

  - Precio con descuento resaltado
  
  - Porcentaje de descuento al lado del precio original
  
  - Precio de aliado (si aplica)
  
  - Imagen del producto

- Enlace directo al producto en la tienda original.

## 🛠️ Tecnologías usadas
- Frontend: Next.js + React

- Estilos: Tailwind CSS

- Base de datos: MongoDB (MongoDB Atlas)

- API interna: Next.js Route Handlers para consumir la base de datos

- Scraper: Node.js + Puppeteer (repositorio separado)

## 📂 Estructura del proyecto
```bash

/src
  /app
    /api
      /descuentos    → Endpoints para consumir la base de datos
    /page.js         → Página principal con filtros y listado
  /components        → Componentes reutilizables (tarjeta de producto, filtros, etc.)
  /lib/mongodb.js    → Conexión a MongoDB
```
## 🚀 Instalación y uso

### 1. Instalar dependencias
``` bash
npm install
```
### 2. Configurar variables de entorno
Crea un archivo .env.local con el siguiente contenido:

``` env
MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/Descuentos"
```
### 3. Ejecutar en desarrollo
``` bash

npm run dev
```
La aplicación estará disponible en:

``` arduino

http://localhost:3000
```
## 🤖 Scraper
El scraper que alimenta esta aplicación está en un repositorio separado:

[🔗 Repositorio del Scraper](https://github.com/joanomana/exito_descuentos)

### El scraper:

- Obtiene productos y descuentos de diferentes categorías

- Guarda los datos en MongoDB

- Se puede ejecutar de forma periódica con Docker o en un servidor
