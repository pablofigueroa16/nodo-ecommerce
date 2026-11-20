# Nodo — Ecommerce

**Autor:** Pablo Ezequiel Figueroa

**Sitio publicado:** https://pablofigueroa16.github.io/nodo-ecommerce/

## Descripción

Nodo es una tienda online de tecnología desarrollada como trabajo práctico de la
materia. Vende notebooks, periféricos, audio y componentes de PC.

El proyecto se entrega por etapas:

- **Etapa 1:** estructura general de la aplicación con HTML (home, categorías,
  login y registro).
- **Etapa 2:** estilos e identidad visual con CSS.
- **Etapa 3:** JavaScript para redirecciones, sesión simulada y componentes.
- **Etapa 4 (actual):** catálogo en JSON consumido con `fetch`, carrito de
  compras en `localStorage` y usuario logueado en `sessionStorage`.

No hay servidor ni base de datos: la sesión y el carrito se simulan con el
almacenamiento del navegador.

## Estructura del proyecto

```
nodo-ecommerce/
├── index.html              Página de inicio (home)
├── pages/
│   ├── login.html          Formulario de inicio de sesión
│   ├── registro.html       Formulario de registro de usuario
│   ├── notebooks.html      Categoría: Notebooks
│   ├── perifericos.html    Categoría: Periféricos
│   ├── audio.html          Categoría: Audio
│   ├── componentes.html    Categoría: Componentes
│   └── carrito.html        Carrito de compras
├── data/
│   └── productos.json      Catálogo de productos (fuente de datos)
├── img/                    Logo (SVG) y fotos de productos (WebP, Unsplash)
├── css/
│   └── estilos.css         Hoja de estilos general
├── js/
│   ├── main.js             Navbar y footer de todas las páginas
│   ├── home.js             Productos de cada categoría en el home
│   ├── categoria.js        Cards de la página de cada categoría
│   ├── carrito.js          Página del carrito
│   ├── login.js            Inicio de sesión
│   ├── registro.js         Registro de usuario
│   ├── data/
│   │   └── paginas.js      Array de páginas (títulos, rutas y tipo)
│   ├── services/
│   │   └── productos.js    fetch del catálogo JSON
│   ├── components/
│   │   ├── navbar.js       Componente navbar
│   │   ├── footer.js       Componente footer
│   │   ├── card.js         Componente card de producto
│   │   ├── aviso.js        Mensaje temporal ("Agregaste… al carrito")
│   │   └── estado.js       Mensaje de carga o de error
│   └── utils/
│       ├── rutas.js        Rutas relativas según la carpeta de la página
│       ├── sesion.js       Usuario logueado (sessionStorage)
│       ├── usuarios.js     Usuarios registrados (localStorage)
│       ├── carrito.js      Carrito de compras (localStorage)
│       └── formato.js      Formato de precios
├── ENTREGA.md              Documento de la entrega final
└── README.md
```

## Etapa 1: estructura general

El objetivo de esta etapa fue armar la estructura de la aplicación con HTML:
la página de inicio, una página por categoría y los formularios de login y
registro. El profesor confirmó que todas las consignas quedaron completas.

### Páginas

| Página | Archivo | `<title>` | Título del body |
|---|---|---|---|
| Home | `index.html` | Nodo | Bienvenido a Nodo |
| Notebooks | `pages/notebooks.html` | Nodo \| Notebooks | Notebooks |
| Periféricos | `pages/perifericos.html` | Nodo \| Periféricos | Periféricos |
| Audio | `pages/audio.html` | Nodo \| Audio | Audio |
| Componentes | `pages/componentes.html` | Nodo \| Componentes | Componentes |
| Login | `pages/login.html` | Nodo \| Iniciar sesión | Iniciar sesión |
| Registro | `pages/registro.html` | Nodo \| Crear cuenta | Crear cuenta |

### Consignas cumplidas

- **Repositorio:** público en GitHub, con este README que incluye nombre,
  apellido y descripción del proyecto.
- **Home:** `index.html` con el nombre de la tienda en el `<title>` y un título
  en el body.
- **Navbar:** presente en todas las páginas, con el ícono de la tienda, enlace a
  Home, las cuatro categorías y un botón de cerrar sesión.
- **Categorías:** cuatro páginas (Notebooks, Periféricos, Audio y Componentes),
  cada una con `<title>` "Nodo | Nombre de la categoría" y el nombre de la
  categoría como título del body. Se accede a todas desde el navbar.
- **Login:** formulario con los campos email y contraseña y botón de submit.
- **Registro:** formulario con los campos nombre, apellido, email, contraseña y
  fecha de nacimiento, y botón de submit.

### Decisiones de estructura

- **Inputs con el tipo adecuado:** `email`, `password` y `date` según el dato,
  cada uno con su `<label>` y marcado como `required`.
- **HTML semántico:** `header`, `nav`, `main`, `section`, `article` y `footer`
  para ordenar el contenido de cada página.

## Etapa 2: estilos e identidad

Los estilos están hechos con **CSS puro**, sin frameworks, en una sola hoja
(`css/estilos.css`) organizada por secciones: variables, base, navbar, hero,
grilla, tarjetas, formularios, pie de página y responsive.

### Paleta de colores

Todos los colores están definidos como variables en `:root`, así se pueden
cambiar desde un único lugar.

| Rol | Variable | Color |
|---|---|---|
| Principal (azul eléctrico) | `--acento` | `#1f4bff` |
| Principal oscuro (hover) | `--acento-oscuro` | `#1535cc` |
| Principal profundo (degradados) | `--acento-profundo` | `#0b1a66` |
| Secundario (ofertas) | `--secundario` | `#ff6b1a` |
| Secundario oscuro (precios) | `--secundario-oscuro` | `#d9480f` |
| Fondo | `--fondo` | `#f5f7fb` |
| Superficie (tarjetas, formularios) | `--superficie` | `#ffffff` |
| Texto | `--texto` | `#0f1424` |
| Texto secundario | `--texto-suave` | `#5a6378` |

El azul eléctrico es el color de la marca: logo, botones, links y página activa.
El naranja es su complementario y se reserva para precios y ofertas, para que
resalten en las tarjetas de producto.

### Tipografía

Se usan dos fuentes de [Google Fonts](https://fonts.google.com):

- **Space Grotesk** para títulos, la marca y los precios.
- **Inter** para el texto general, los formularios y la navegación.

### Logo

El logo es propio y está hecho en SVG (`img/logo.svg`): un nodo central
conectado a cuatro nodos, en referencia al nombre de la tienda. Se usa en el
navbar, en el pie de página y como favicon.

### Consignas cumplidas

- **Identidad y paleta:** paleta propia azul eléctrico + naranja, tipografía y
  logo.
- **Navbar:** barra flotante con fondo translúcido, página activa resaltada y
  botones de sesión. En pantallas chicas se convierte en un menú hamburguesa
  hecho solo con CSS.
- **Login y registro:** formularios centrados en una tarjeta, con estados de
  foco en los campos, sobre un fondo con degradados y grilla.
- **Card de producto:** foto, especificaciones, nombre, descripción, precio y
  botón "Agregar", con efecto al pasar el mouse.
- **Layout general:** grilla adaptable (`auto-fill`) que se usa en el home para
  las categorías y en cada categoría para los productos.
- **Opcional, logo propio:** `img/logo.svg`.
- **Opcional, fondos con degradados:** hero del home y fondo de login y
  registro.

### Decisiones de diseño

- **CSS puro:** alcanza para todo lo que pide la etapa y las variables de CSS
  cumplen el rol que tendrían las de SASS.
- **Sin JavaScript:** el menú hamburguesa usa un checkbox oculto y el selector
  `:checked`. JavaScript queda para las próximas etapas.
- **Imágenes en WebP:** las fotos pasaron de JPG a WebP y el peso total bajó de
  572 KB a 288 KB. El logo está en SVG.
- **Responsive:** el menú hamburguesa aparece desde 960 px para abajo y desde
  600 px se ajustan márgenes, títulos, hero, formularios y footer.

## Etapa 3: JavaScript y componentes

El objetivo de esta etapa fue empezar a usar JavaScript para redireccionar al
usuario, crear componentes reutilizables y ordenar el proyecto pensando en su
mantenimiento. El código usa **módulos de JavaScript** (`import` / `export`) y
está separado en datos, componentes y utilidades.

### Estructuras de datos

- **`js/data/paginas.js`:** array de objetos con el `id`, el `titulo` y la
  `ruta` de cada página, más `enNavbar` para indicar cuáles aparecen en el
  navbar.
- **`js/data/productos.js`:** array con los 12 productos de la tienda (3 por
  categoría), cada uno con categoría, nombre, especificaciones, descripción,
  precio, imagen y texto alternativo.

Las rutas se guardan desde la raíz del proyecto y `js/utils/rutas.js` les
agrega `./` o `../` según la carpeta de la página que las usa.

### Componentes

- **Navbar:** se arma recorriendo el array de páginas y marca sola la página
  activa. En las páginas para usuarios logueados muestra los links y el botón
  "Cerrar sesión"; en login y registro muestra solo el logo.
- **Footer:** se arma con el mismo array: las categorías en una columna y las
  páginas de cuenta en otra.
- **Card de producto:** recibe un producto y devuelve la tarjeta con imagen,
  título, descripción, precio y un contador para elegir la cantidad (de 1 a
  10). Cada página de categoría filtra los productos por su categoría y dibuja
  una card por cada uno.

### Consignas cumplidas

- **Login:** al enviar el formulario se guarda la sesión y se redirige al home.
- **Logout:** el botón "Cerrar sesión" borra la sesión y redirige al login.
- **Estructura de datos de páginas:** array de objetos con direcciones y
  títulos en `js/data/paginas.js`.
- **Componente navbar:** generado a partir de ese array y usado en todas las
  páginas para usuarios logueados.
- **Componente card:** con imagen, título, descripción, precio y botones para
  aumentar o disminuir la cantidad.
- **Opcional, datos para probar la card:** `js/data/productos.js`.

### Decisiones

- **Módulos de JavaScript:** cada archivo exporta solo lo que usan los demás,
  sin variables globales compartidas.
- **Sesión simulada:** como todavía no hay servidor, la sesión se guarda en
  `sessionStorage`. El home y las categorías mandan al login si no hay sesión,
  y el registro lleva al login al completarse.
- **HTML más liviano:** el navbar, el footer y los productos ya no se repiten
  en cada página; se generan desde los componentes y los datos.

### Correcciones del profesor (aplicadas en la etapa 4)

- **Scripts al final del `<body>`:** si un script falla, el HTML ya se dibujó
  igual.
- **Navegar sin estar logueado:** el sitio ya no manda al login al entrar.
  Cualquiera puede recorrer las categorías y armar el carrito; el login se pide
  recién al finalizar la compra.
- **Sin "Home" en el navbar:** al inicio se vuelve con el logo.

## Etapa 4: datos, sesión y carrito

El objetivo de esta etapa fue traer los productos desde una fuente de datos y
completar el circuito de compra: elegir productos, guardarlos en el carrito y
verlos en la página del carrito.

### Fuente de datos

Los productos están en **`data/productos.json`**, un array de objetos con
`id`, `categoria`, `nombre`, `specs`, `descripcion`, `precio`, `imagen` y
`alt`. `js/services/productos.js` los trae con `fetch` y cada página filtra lo
que necesita:

- **Home:** una sección por categoría con 3 productos y un link a la
  categoría completa.
- **Categorías:** todos los productos de esa categoría.

Mientras carga se muestra "Cargando productos…" y, si el `fetch` falla, un
mensaje de error en lugar de una página vacía.

### Sesión (`sessionStorage`)

Al iniciar sesión se guarda el usuario logueado en la clave `nodo-usuario`:

```json
{ "nombre": "Ana", "apellido": "Pérez", "email": "ana@mail.com" }
```

Si el email se registró antes, el nombre sale del registro (guardado en
`localStorage`, clave `nodo-usuarios`, **sin la contraseña**); si no, sale de
la parte del email antes de la @. Con sesión, el navbar saluda al usuario y
muestra "Cerrar sesión"; sin sesión muestra "Ingresar" y "Crear cuenta".

### Carrito (`localStorage`)

Cada producto que se agrega se guarda en la clave `nodo-carrito`:

```json
[
  { "id": 1, "nombre": "Notebook 14\" i5", "precio": 780000,
    "imagen": "img/notebook-14.webp", "alt": "…", "cantidad": 2 }
]
```

- **Card:** el contador elige de 1 a 10 unidades y "Agregar al carrito" las
  suma. Si el producto ya estaba, se acumula la cantidad (máximo 10).
- **Navbar:** el link al carrito muestra cuántas unidades hay, y se actualiza
  al agregar productos, incluso desde otra pestaña.
- **Página del carrito:** lista cada producto con foto, precio unitario,
  cantidad editable, subtotal y botón para eliminarlo. El resumen muestra el
  total, "Finalizar compra" y "Vaciar carrito".
- **Finalizar compra:** sin sesión lleva al login y, al ingresar, vuelve al
  carrito. Con sesión vacía el carrito y muestra un mensaje de gracias.

### Consignas cumplidas

- **Estructura JSON:** `data/productos.json`.
- **fetch:** `js/services/productos.js`.
- **Cards por categoría:** se completan con los datos del JSON.
- **Home con productos:** 3 productos por cada una de las 4 categorías.
- **Usuario en `sessionStorage`:** nombre, apellido y email.
- **Carrito en `localStorage`:** un array con cada producto y su cantidad.
- **Página del carrito:** muestra los productos guardados.
- **Opcional, eliminar productos:** botón por producto y "Vaciar carrito".

### Decisiones

- **El carrito no pide sesión:** como en cualquier tienda, se arma sin
  loguearse y el login se pide al pagar.
- **El carrito guarda una copia de los datos:** nombre, precio e imagen quedan
  en `localStorage`, así la página del carrito no depende del `fetch`.
- **Sin contraseñas guardadas:** sin servidor no hay forma segura de
  guardarlas, así que el login sigue siendo simulado.
- **El email del registro no pasa por la URL:** el login lo recibe por
  `sessionStorage` para que no quede en el historial.

## Cómo verlo

El sitio está publicado con GitHub Pages en
https://pablofigueroa16.github.io/nodo-ecommerce/ y se actualiza con cada push
a `main`.

Para correrlo en tu computadora: como el proyecto usa módulos de JavaScript y
`fetch`, **no funciona abriendo `index.html` con doble clic**, hace falta un
servidor local.

```bash
git clone https://github.com/pablofigueroa16/nodo-ecommerce.git
cd nodo-ecommerce
```

Abrí la carpeta en VS Code y, con la extensión
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer),
hacé clic derecho en `index.html` → **Open with Live Server**. Se puede
navegar sin cuenta; para finalizar una compra, cualquier email y contraseña
sirven para entrar.

## Créditos

Las fotos de productos provienen de [Unsplash](https://unsplash.com) y se usan
bajo la [Unsplash License](https://unsplash.com/license), que permite su uso
gratuito, incluso comercial, sin requerir atribución. Están descargadas en
`img/` para que el sitio funcione sin depender de servicios externos.

Las fuentes Inter y Space Grotesk se usan bajo la
[SIL Open Font License](https://openfontlicense.org).
