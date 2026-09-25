# Nodo — Ecommerce

**Autor:** Pablo Ezequiel Figueroa

## Descripción

Nodo es una tienda online de tecnología desarrollada como trabajo práctico de la
materia. Vende notebooks, periféricos, audio y componentes de PC.

Esta es la **etapa 1** del proyecto, cuyo objetivo es armar la estructura general
de la aplicación con HTML y CSS: la página de inicio, las páginas de cada
categoría y los formularios de login y registro. Todavía no hay lógica de
servidor ni base de datos.

## Estructura del proyecto

```
nodo-ecommerce/
├── index.html          Página de inicio (home)
├── login.html          Formulario de inicio de sesión
├── registro.html       Formulario de registro de usuario
├── notebooks.html      Categoría: Notebooks
├── perifericos.html    Categoría: Periféricos
├── audio.html          Categoría: Audio
├── componentes.html    Categoría: Componentes
├── img/                Logo (SVG) y fotos de productos (WebP, Unsplash)
├── css/
│   └── estilos.css     Hoja de estilos general
└── README.md
```

## Contenido de la entrega

- Navbar presente en todas las páginas, con el ícono de la tienda, enlace a Home,
  las cuatro categorías y un botón de cerrar sesión.
- `index.html` con el nombre de la tienda en el `<title>` y un título en el `<body>`.
- Una página por categoría, con `<title>` "Nodo | Nombre de la categoría" y el
  nombre de la categoría como título del `<body>`. Se accede a todas desde el navbar.
- Login con los campos email y contraseña, dentro de un `<form>` con botón de submit.
- Registro con los campos nombre, apellido, email, contraseña y fecha de
  nacimiento, dentro de un `<form>` con botón de submit.

## Cómo verlo

Cloná el repositorio y abrí `index.html` en el navegador:

```bash
git clone git@github.com:pablofigueroa16/nodo-ecommerce.git
cd nodo-ecommerce
```

## Próximas etapas

- Estilos y diseño responsive más completos.
- Listado de productos y detalle de producto.
- Carrito de compras.
- Validación de formularios con JavaScript.

## Créditos de las imágenes

Las fotos de productos provienen de [Unsplash](https://unsplash.com) y se usan
bajo la [Unsplash License](https://unsplash.com/license), que permite su uso
gratuito, incluso comercial, sin requerir atribución. Están descargadas en
`img/` para que el sitio funcione sin depender de servicios externos.
