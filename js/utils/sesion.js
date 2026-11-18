// Sesión simulada: los datos del usuario logueado viven en sessionStorage
// y se borran al cerrar la pestaña o al cerrar sesión.
const CLAVE_SESION = "nodo-usuario";

export function iniciarSesion(usuario) {
  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
}

export function obtenerUsuario() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE_SESION));
  } catch {
    return null;
  }
}

export function haySesion() {
  return obtenerUsuario() !== null;
}
