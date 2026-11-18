import { categorias } from "../data/paginas.js";
import { rutaDesdeRaiz, rutaDePagina, esPaginaActual } from "../utils/rutas.js";
import { obtenerUsuario, cerrarSesion } from "../utils/sesion.js";
import { contarUnidades } from "../utils/carrito.js";

const ICONO_CARRITO = `
  <svg class="icono" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.76L20.5 8H6.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor"/>
    <circle cx="17" cy="19.5" r="1.4" fill="currentColor"/>
  </svg>
`;

function crearMarca() {
  return `
    <a class="marca" href="${rutaDePagina("home")}" aria-label="Nodo, ir al inicio">
      <img class="logo" src="${rutaDesdeRaiz("img/logo.svg")}" alt="" width="28" height="28">
      Nodo
    </a>
  `;
}

function crearLinks() {
  return categorias
    .map((pagina) => {
      const actual = esPaginaActual(pagina.ruta) ? ' class="activo" aria-current="page"' : "";
      return `<li><a${actual} href="${rutaDesdeRaiz(pagina.ruta)}">${pagina.titulo}</a></li>`;
    })
    .join("");
}

function crearLinkCarrito() {
  const actual = esPaginaActual("pages/carrito.html") ? " activo" : "";
  return `
    <a class="btn-carrito${actual}" href="${rutaDePagina("carrito")}">
      ${ICONO_CARRITO}
      Carrito
      <span class="carrito-cantidad" hidden></span>
    </a>
  `;
}

function crearAccionesDeCuenta(usuario) {
  if (usuario) {
    return `
      <span class="saludo">Hola, <strong></strong></span>
      <button class="btn-logout" type="button">Cerrar sesión</button>
    `;
  }

  return `
    <a class="link-cuenta" href="${rutaDePagina("login")}">Ingresar</a>
    <a class="btn-cuenta" href="${rutaDePagina("registro")}">Crear cuenta</a>
  `;
}

function crearNavbarCompleto(usuario) {
  return `
    ${crearMarca()}

    <input class="menu-toggle" type="checkbox" id="menu-toggle">
    <label class="menu-boton" for="menu-toggle" aria-label="Abrir menú">
      <span></span>
      <span></span>
      <span></span>
    </label>

    <nav aria-label="Categorías">
      <ul>
        ${crearLinks()}
      </ul>
    </nav>

    <div class="acciones">
      ${crearLinkCarrito()}
      ${crearAccionesDeCuenta(usuario)}
    </div>
  `;
}

function actualizarContadorCarrito(contenedor) {
  const contador = contenedor.querySelector(".carrito-cantidad");
  const unidades = contarUnidades();
  contador.textContent = unidades;
  contador.hidden = unidades === 0;
  contenedor.querySelector(".btn-carrito").setAttribute(
    "aria-label",
    unidades === 0 ? "Carrito vacío" : `Carrito: ${unidades} productos`
  );
}

export function renderNavbar(contenedor) {
  if (contenedor.dataset.variante === "simple") {
    contenedor.innerHTML = crearMarca();
    return;
  }

  const usuario = obtenerUsuario();
  contenedor.innerHTML = crearNavbarCompleto(usuario);

  if (usuario) {
    // El nombre lo escribió el usuario: se inserta como texto, no como HTML.
    contenedor.querySelector(".saludo strong").textContent = usuario.nombre;
    contenedor.querySelector(".btn-logout").addEventListener("click", () => {
      cerrarSesion();
      window.location.href = rutaDePagina("home");
    });
  }

  actualizarContadorCarrito(contenedor);
  document.addEventListener("carrito:cambio", () => actualizarContadorCarrito(contenedor));
  // Si el carrito cambia en otra pestaña, también se actualiza acá.
  window.addEventListener("storage", () => actualizarContadorCarrito(contenedor));
}
