import { paginas } from "../data/paginas.js";
import { rutaDesdeRaiz, rutaDePagina, esPaginaActual } from "../utils/rutas.js";
import { cerrarSesion } from "../utils/sesion.js";

function crearMarca() {
  return `
    <a class="marca" href="${rutaDePagina("home")}">
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
  if (contenedor.dataset.variante === "simple") {
    contenedor.innerHTML = crearMarca();
    return;
  }

  contenedor.innerHTML = crearNavbarCompleto();
  contenedor.querySelector(".btn-logout").addEventListener("click", cerrarSesion);
}
