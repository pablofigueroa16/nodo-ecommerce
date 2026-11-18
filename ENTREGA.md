# Nodo — Entrega final del Trabajo Integrador

**Materia:** Aplicaciones Web 1
**Autor:** Pablo Ezequiel Figueroa

## Links

- **Sitio publicado:** https://pablofigueroa16.github.io/nodo-ecommerce/
- **Repositorio:** https://github.com/pablofigueroa16/nodo-ecommerce
- **Video explicativo:** _(completar con el link de YouTube, Drive o Loom)_

## 1. Roadmap de desarrollo

El proyecto se armó en cuatro etapas. Cada una partió de las correcciones de la
anterior y quedó registrada en el historial de commits del repositorio.

### Etapa 1 — Estructura HTML (agosto 2026)

- Páginas: home, cuatro categorías (Notebooks, Periféricos, Audio y
  Componentes), login y registro.
- Navbar en todas las páginas y formularios con los inputs adecuados
  (`email`, `password`, `date`).
- HTML semántico: `header`, `nav`, `main`, `section`, `article` y `footer`.

### Etapa 2 — Estilos e identidad (septiembre 2026)

- Paleta propia (azul eléctrico + naranja) definida con variables de CSS.
- Tipografías Space Grotesk e Inter, y logo propio en SVG usado también como
  favicon.
- Hero con degradado, tarjetas con efectos al pasar el mouse y fondo con
  grilla en login y registro.
- Diseño responsive con menú hamburguesa hecho solo con CSS.
- Fotos convertidas de JPG a WebP (de 572 KB a 288 KB en total).
- Reorganización: páginas secundarias en `pages/` y rutas relativas con `./`.

### Etapa 3 — JavaScript y componentes (octubre 2026)

- Módulos de JavaScript (`import` / `export`) separados en datos, componentes
  y utilidades.
- Array de páginas para generar el navbar y el footer.
- Componente card de producto con contador de cantidad.
- Login y logout con sesión simulada en `sessionStorage`.

### Etapa 4 — Datos, sesión y carrito (noviembre 2026)

- Correcciones de la etapa 3:
  - scripts al final del `<body>`;
  - navegación libre sin estar logueado;
  - "Home" fuera del navbar (al inicio se vuelve con el logo).
- Catálogo en `data/productos.json`, traído con `fetch`.
- Home con 3 productos por categoría y páginas de categoría con todos sus
  productos.
- Usuario logueado en `sessionStorage` y carrito en `localStorage`.
- Página de carrito: editar cantidades, eliminar productos, vaciar y
  finalizar la compra.
- Publicación en GitHub Pages.

### Cambios de rumbo en el camino

- **Sesión obligatoria → navegación libre:** en la etapa 3 todas las páginas
  pedían login. Por la corrección del profesor se cambió al modelo de
  cualquier tienda: se navega y se arma el carrito libremente, y el login se
  pide al finalizar la compra.
- **Productos en el HTML → array en JS → JSON:** en la etapa 1 las cards
  estaban escritas a mano; en la etapa 3 pasaron a un array de JavaScript y en
  la etapa 4 a un archivo JSON que se consume con `fetch`, como se haría con
  una API real.

## 2. Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| HTML5 | Estructura semántica de las páginas |
| CSS3 | Estilos, variables, Flexbox, Grid y responsive (sin frameworks) |
| JavaScript (ES Modules) | Componentes, lógica de sesión y carrito |
| JSON + `fetch` | Catálogo de productos |
| `sessionStorage` / `localStorage` | Usuario logueado, usuarios registrados y carrito |
| Google Fonts | Tipografías Inter y Space Grotesk |
| Git y GitHub | Control de versiones y repositorio público |
| GitHub Pages | Publicación del sitio |

### Tecnologías que no estaban en las entregas anteriores

- **Fetch API y JSON.** Se eligieron porque permiten separar los datos del
  código: para cambiar un precio o sumar un producto se edita el JSON, sin
  tocar JavaScript. `fetch` devuelve una promesa que se maneja con
  `async/await`, y si la carga falla se muestra un mensaje de error en lugar
  de una página vacía. Si mañana el catálogo viene de una API, solo cambia la
  URL en `js/services/productos.js`.
- **Web Storage (`sessionStorage` y `localStorage`).** `sessionStorage` guarda
  al usuario logueado solo mientras la pestaña está abierta, como una sesión
  real. `localStorage` guarda el carrito de forma permanente, así no se pierde
  al cerrar el navegador. Los dos guardan texto, así que los objetos se pasan
  por `JSON.stringify` y `JSON.parse`.
- **Eventos personalizados (`CustomEvent`).** Cuando el carrito cambia se
  dispara el evento `carrito:cambio` y el navbar actualiza el contador sin que
  la card tenga que conocer al navbar. Con el evento `storage` el contador
  también se actualiza si el carrito cambia en otra pestaña.
- **GitHub Pages.** Hosting gratuito que publica el sitio directo desde el
  repositorio: cada `push` a `main` actualiza la versión online. Sirve el
  sitio por HTTP, que es lo que necesitan los módulos de JavaScript y `fetch`.

## 3. Mejora significativa

### Nueva funcionalidad: circuito de compra completo

En las entregas anteriores el botón "Agregar" no hacía nada. Ahora la compra
funciona de punta a punta:

1. El usuario elige la cantidad en la card y la agrega al carrito.
2. Un aviso confirma lo que agregó y el contador del navbar se actualiza.
3. En el carrito puede cambiar cantidades, eliminar productos o vaciarlo, y
   ve el subtotal de cada producto y el total.
4. Al finalizar la compra, si no inició sesión, se lo lleva al login y, al
   ingresar, vuelve al carrito para terminar.

### Experiencia de usuario y accesibilidad

- **Navegación libre:** ya no se obliga a loguearse para ver la tienda.
- **Navbar según la sesión:** sin sesión muestra "Ingresar" y "Crear cuenta";
  con sesión saluda al usuario por su nombre.
- **Estados de carga y error:** mientras el catálogo carga, o si falla, el
  usuario ve un mensaje en lugar de una página vacía.
- **Accesibilidad:**
  - foco visible en links y botones;
  - el aviso de "agregado al carrito" se anuncia a los lectores de pantalla
    (`role="status"`);
  - los botones de solo ícono tienen `aria-label`;
  - el foco no se pierde al editar el carrito con teclado;
  - se respeta la preferencia de "reducir movimiento" del sistema.
- **Rendimiento:** imágenes con `loading="lazy"`, ancho y alto declarados, y
  scripts al final del `<body>`.

### Organización del código

- Una carpeta `services/` para el acceso a datos, separada de la lógica de
  carrito, sesión y usuarios (`utils/`) y de los componentes visuales
  (`components/`).
- El array de páginas tiene un campo `tipo` (inicio, categoría, carrito,
  cuenta) y el navbar y el footer se arman a partir de él.

## 4. Publicación

El sitio está publicado con **GitHub Pages** desde la rama `main`:

https://pablofigueroa16.github.io/nodo-ecommerce/

## 5. Video explicativo

_(completar con el link)_

Recorrido sugerido para el video:

1. Home sin sesión: hero, categorías y productos de cada categoría.
2. Una categoría: cards, contador de cantidad y "Agregar al carrito".
3. El aviso y el contador del carrito en el navbar.
4. La página del carrito: cambiar cantidades, eliminar un producto y ver el
   total.
5. "Finalizar compra" sin sesión: registro, login y vuelta al carrito.
6. Compra finalizada y cierre de sesión.
7. El sitio en el celular, con el menú hamburguesa.
8. Reflexión personal:
   - conocimientos previos;
   - qué fue lo más fácil y lo más difícil;
   - qué etapa disfrutaste más.
