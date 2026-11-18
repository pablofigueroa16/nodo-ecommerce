// Usuarios registrados, guardados en localStorage para que el login pueda
// recuperar el nombre. No se guarda la contraseña: sin servidor no hay forma
// segura de hacerlo, así que el login sigue siendo simulado.
const CLAVE_USUARIOS = "nodo-usuarios";

function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) ?? [];
  } catch {
    return [];
  }
}

export function registrarUsuario(usuario) {
  const usuarios = obtenerUsuarios().filter((guardado) => guardado.email !== usuario.email);
  usuarios.push(usuario);
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

export function buscarUsuario(email) {
  return obtenerUsuarios().find((usuario) => usuario.email === email) ?? null;
}
