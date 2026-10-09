import { paginas } from "../data/paginas.js";
import { rutaDesdeRaiz, esPaginaActual } from "../utils/rutas.js";

function crearMarca() {
  return `
    <a class="marca" href="${rutaDesdeRaiz("index.html")}">
      <img class="logo" src="${rutaDesdeRaiz("img/logo.svg")}" alt="" width="28" height="28">
      Nodo
    </a>
  `;
}

function crearLinks() {
  return paginas
    .filter((pagina) => pagina.enNavbar)
    .map((pagina) => {
      const clase = esPaginaActual(pagina.ruta) ? ' class="activo"' : "";
      return `<li><a${clase} href="${rutaDesdeRaiz(pagina.ruta)}">${pagina.titulo}</a></li>`;
    })
    .join("");
}

function crearNavbarCompleto() {
  return `
    ${crearMarca()}

    <input class="menu-toggle" type="checkbox" id="menu-toggle">
    <label class="menu-boton" for="menu-toggle" aria-label="Abrir menú">
      <span></span>
      <span></span>
      <span></span>
    </label>

    <nav>
      <ul>
        ${crearLinks()}
      </ul>
    </nav>

    <div class="acciones">
      <button class="btn-logout" type="button">Cerrar sesión</button>
    </div>
  `;
}

export function renderNavbar(contenedor) {
  const esSimple = contenedor.dataset.variante === "simple";
  contenedor.innerHTML = esSimple ? crearMarca() : crearNavbarCompleto();
}
