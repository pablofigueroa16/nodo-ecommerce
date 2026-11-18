// Mensaje de "cargando" o de error que ocupa el lugar de las cards.
export function crearEstado(mensaje, esError = false) {
  const estado = document.createElement("p");
  estado.className = esError ? "estado estado-error" : "estado";
  estado.textContent = mensaje;
  return estado;
}
