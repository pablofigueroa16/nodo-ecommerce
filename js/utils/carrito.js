// Carrito guardado en localStorage: un array con los datos de cada producto
// elegido y su cantidad. Cada cambio avisa con el evento "carrito:cambio"
// para que el navbar actualice el contador.
const CLAVE_CARRITO = "nodo-carrito";

export const CANTIDAD_MINIMA = 1;
export const CANTIDAD_MAXIMA = 10;

export function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) ?? [];
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  document.dispatchEvent(new CustomEvent("carrito:cambio"));
}

function limitar(cantidad) {
  return Math.min(Math.max(cantidad, CANTIDAD_MINIMA), CANTIDAD_MAXIMA);
}

// Suma el producto al carrito. Si ya estaba, acumula la cantidad sin pasar
// el máximo. Devuelve la cantidad que quedó en el carrito.
export function agregarAlCarrito(producto, cantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find((item) => item.id === producto.id);

  if (item) {
    item.cantidad = limitar(item.cantidad + cantidad);
    guardarCarrito(carrito);
    return item.cantidad;
  }

  const nuevo = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    alt: producto.alt,
    cantidad: limitar(cantidad)
  };
  carrito.push(nuevo);
  guardarCarrito(carrito);
  return nuevo.cantidad;
}

export function cambiarCantidad(id, cantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find((item) => item.id === id);
  if (item) {
    item.cantidad = limitar(cantidad);
    guardarCarrito(carrito);
  }
}

export function quitarDelCarrito(id) {
  guardarCarrito(obtenerCarrito().filter((item) => item.id !== id));
}

export function vaciarCarrito() {
  guardarCarrito([]);
}

export function contarUnidades(carrito = obtenerCarrito()) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

export function calcularTotal(carrito = obtenerCarrito()) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}
