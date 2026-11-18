import { paginas } from "../data/paginas.js";

const raiz = window.location.pathname.includes("/pages/") ? "../" : "./";

export function rutaDesdeRaiz(ruta) {
  return raiz + ruta;
}

export function existePagina(id) {
  return paginas.some((pagina) => pagina.id === id);
}

// Devuelve la ruta de una página por su id. Los parámetros opcionales se
// agregan a la URL, por ejemplo { volver: "carrito" } → "?volver=carrito".
export function rutaDePagina(id, parametros = {}) {
  const pagina = paginas.find((pagina) => pagina.id === id);
  const consulta = new URLSearchParams(parametros).toString();
  return rutaDesdeRaiz(pagina.ruta) + (consulta ? "?" + consulta : "");
}

export function esPaginaActual(ruta) {
  const actual = window.location.pathname;
  if (ruta === "index.html" && actual.endsWith("/")) {
    return true;
  }
  return actual.endsWith("/" + ruta);
}
