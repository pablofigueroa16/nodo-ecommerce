import { paginas } from "../data/paginas.js";

const raiz = window.location.pathname.includes("/pages/") ? "../" : "./";

export function rutaDesdeRaiz(ruta) {
  return raiz + ruta;
}

export function rutaDePagina(id) {
  const pagina = paginas.find((pagina) => pagina.id === id);
  return rutaDesdeRaiz(pagina.ruta);
}

export function esPaginaActual(ruta) {
  const actual = window.location.pathname;
  if (ruta === "index.html" && actual.endsWith("/")) {
    return true;
  }
  return actual.endsWith("/" + ruta);
}
