import { rutaDePagina } from "./rutas.js";

const CLAVE_SESION = "nodo-usuario";

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
  window.location.href = rutaDePagina("login");
}
