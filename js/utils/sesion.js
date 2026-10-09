import { paginas } from "../data/paginas.js";
import { rutaDePagina, esPaginaActual } from "./rutas.js";

const CLAVE_SESION = "nodo-usuario";

export function iniciarSesion(email) {
  sessionStorage.setItem(CLAVE_SESION, email);
  window.location.href = rutaDePagina("home");
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
  window.location.href = rutaDePagina("login");
}

export function haySesion() {
  return sessionStorage.getItem(CLAVE_SESION) !== null;
}

export function protegerPagina() {
  const paginaActual = paginas.find((pagina) => esPaginaActual(pagina.ruta));
  const esProtegida = paginaActual && paginaActual.enNavbar;

  if (esProtegida && !haySesion()) {
    window.location.replace(rutaDePagina("login"));
  }
}
