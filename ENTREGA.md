# Nodo: entrega final del Trabajo Integrador

Materia: Aplicaciones Web 1
Autor: Pablo Ezequiel Figueroa

## Links

- Sitio publicado: https://pablofigueroa16.github.io/nodo-ecommerce/
- Repositorio: https://github.com/pablofigueroa16/nodo-ecommerce
- Video explicativo: https://drive.google.com/file/d/1goXZ_LJmRc4Tm2jZcv0wrkCyfeVhF6UW/view?usp=sharing

## 1. Roadmap de desarrollo

Armé el proyecto en cuatro etapas. En cada una arranqué por las correcciones
de la anterior, y todo el avance está en el historial de commits del
repositorio.

### Etapa 1: estructura HTML (agosto 2026)

- Home, cuatro páginas de categoría (Notebooks, Periféricos, Audio y
  Componentes), login y registro.
- Navbar en todas las páginas y formularios con el tipo de input que
  corresponde a cada dato (`email`, `password`, `date`).
- Etiquetas semánticas: `header`, `nav`, `main`, `section`, `article` y
  `footer`.

### Etapa 2: estilos e identidad (septiembre 2026)

- Paleta propia de azul eléctrico y naranja, guardada en variables de CSS.
- Tipografías Space Grotesk e Inter, y un logo en SVG que también uso como
  favicon.
- Hero con degradado, tarjetas que reaccionan al pasar el mouse y un fondo con
  grilla en login y registro.
- Diseño responsive con un menú hamburguesa hecho solo con CSS.
- Pasé las fotos de JPG a WebP y el peso total bajó de 572 KB a 288 KB.
- Moví las páginas secundarias a `pages/` y cambié las rutas relativas al
  formato `./`.

### Etapa 3: JavaScript y componentes (octubre 2026)

- Módulos de JavaScript (`import` / `export`) separados en datos, componentes
  y utilidades.
- Un array de páginas a partir del cual se generan el navbar y el footer.
- Card de producto con contador de cantidad.
- Login y logout con una sesión simulada en `sessionStorage`.

### Etapa 4: datos, sesión y carrito (noviembre 2026)

- Correcciones de la etapa 3: los scripts pasaron al final del `<body>`, el
  sitio se puede recorrer sin iniciar sesión y saqué "Home" del navbar, porque
  al inicio ya se vuelve con el logo.
- El catálogo está en `data/productos.json` y lo traigo con `fetch`.
- El home muestra 3 productos por categoría y cada página de categoría muestra
  todos los suyos.
- El usuario logueado se guarda en `sessionStorage` y el carrito en
  `localStorage`.
- En la página del carrito se pueden editar cantidades, eliminar productos,
  vaciarlo y finalizar la compra.
- Publiqué el sitio en GitHub Pages.

### Cambios de rumbo

En la etapa 3 todas las páginas pedían login. Después de la corrección del
profesor lo cambié a como funciona cualquier tienda: se navega y se arma el
carrito sin cuenta, y el login se pide al finalizar la compra.

Los productos también cambiaron de lugar. En la etapa 1 las cards estaban
escritas a mano en el HTML, en la etapa 3 pasaron a un array de JavaScript y
en la etapa 4 a un archivo JSON que leo con `fetch`, igual que si vinieran de
una API.

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

Fetch API y JSON. Con el catálogo en un JSON, para cambiar un precio o sumar
un producto edito ese archivo y no toco JavaScript. `fetch` devuelve una
promesa, que manejo con `async/await`; si la carga falla, la página muestra un
mensaje de error. Si más adelante los productos vienen de una API, solo cambia
la URL en `js/services/productos.js`.

Web Storage. `sessionStorage` guarda al usuario logueado mientras la pestaña
está abierta, que es lo que dura una sesión. `localStorage` guarda el carrito
sin fecha de vencimiento, así que los productos siguen ahí aunque se cierre el
navegador. Los dos solo guardan texto, por eso los objetos pasan por
`JSON.stringify` al guardarse y por `JSON.parse` al leerse.

Eventos personalizados (`CustomEvent`). Cada vez que cambia el carrito se
dispara el evento `carrito:cambio`, y el navbar lo escucha para actualizar el
contador. De esa forma la card no necesita saber que el navbar existe. El
evento `storage` cumple la misma función cuando el carrito cambia desde otra
pestaña.

GitHub Pages. Es un hosting gratuito que publica el sitio desde el repositorio,
y cada `push` a `main` actualiza la versión online. Sirve las páginas por HTTP,
que es lo que necesitan los módulos de JavaScript y `fetch` para funcionar.

## 3. Mejora significativa

### Circuito de compra completo

En las entregas anteriores el botón "Agregar" no hacía nada. Ahora la compra
funciona de principio a fin:

1. El usuario elige la cantidad en la card y la agrega al carrito.
2. Aparece un aviso con lo que agregó y se actualiza el contador del navbar.
3. En el carrito cambia cantidades, elimina productos o lo vacía, y ve el
   subtotal de cada producto y el total.
4. Si toca "Finalizar compra" sin haber iniciado sesión, va al login y, cuando
   ingresa, vuelve al carrito para terminar.

### Experiencia de usuario y accesibilidad

Ya no hace falta loguearse para ver la tienda. El navbar cambia según la
sesión: sin sesión muestra "Ingresar" y "Crear cuenta", y con sesión saluda al
usuario por su nombre. Mientras el catálogo carga aparece "Cargando
productos…", y si la carga falla se muestra un mensaje de error.

Para la accesibilidad sumé:

- foco visible en links y botones;
- el aviso de "agregado al carrito" lo leen los lectores de pantalla
  (`role="status"`);
- los botones que son solo un ícono tienen `aria-label`;
- al editar el carrito con teclado, el foco queda en el mismo botón;
- si el sistema tiene activado "reducir movimiento", se desactivan las
  animaciones.

En rendimiento, las imágenes cargan con `loading="lazy"` y tienen ancho y alto
declarados, y los scripts están al final del `<body>`.

### Organización del código

Agregué una carpeta `services/` para el acceso a datos, aparte de `utils/`
(carrito, sesión y usuarios) y de `components/` (las piezas visuales). El
array de páginas ahora tiene un campo `tipo` (inicio, categoría, carrito o
cuenta), y el navbar y el footer se arman a partir de ese campo.

## 4. Publicación

El sitio está publicado con GitHub Pages desde la rama `main`:

https://pablofigueroa16.github.io/nodo-ecommerce/

## 5. Video explicativo

https://drive.google.com/file/d/1goXZ_LJmRc4Tm2jZcv0wrkCyfeVhF6UW/view?usp=sharing
