import { paginas } from "../data/paginas.js";
import { rutaDesdeRaiz, rutaDePagina } from "../utils/rutas.js";

function crearLista(lista) {
  return lista
    .map((pagina) => `<li><a href="${rutaDesdeRaiz(pagina.ruta)}">${pagina.titulo}</a></li>`)
    .join("");
}

export function renderFooter(contenedor) {
  const categorias = paginas.filter((pagina) => pagina.enNavbar && pagina.id !== "home");
  const cuenta = paginas.filter((pagina) => !pagina.enNavbar);
  const anio = new Date().getFullYear();

  contenedor.innerHTML = `
    <div class="footer-contenido">
      <div class="footer-marca">
        <a class="marca" href="${rutaDePagina("home")}">
          <img class="logo" src="${rutaDesdeRaiz("img/logo.svg")}" alt="" width="28" height="28">
          Nodo
        </a>
        <p>Tu tienda de tecnología. Notebooks, periféricos, audio y componentes para armar tu setup.</p>
      </div>

      <nav class="footer-columna" aria-label="Categorías">
        <p class="footer-titulo">Categorías</p>
        <ul>
          ${crearLista(categorias)}
        </ul>
      </nav>

      <div class="footer-columna">
        <p class="footer-titulo">Cuenta</p>
        <ul>
          ${crearLista(cuenta)}
        </ul>
      </div>
    </div>

    <p class="footer-copy">Nodo &copy; ${anio} · Todos los derechos reservados</p>
  `;
}
