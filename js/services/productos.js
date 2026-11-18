import { rutaDesdeRaiz } from "../utils/rutas.js";

// Trae el catálogo completo desde el archivo JSON.
export async function obtenerProductos() {
  const respuesta = await fetch(rutaDesdeRaiz("data/productos.json"));

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el catálogo (error ${respuesta.status}).`);
  }

  return respuesta.json();
}
