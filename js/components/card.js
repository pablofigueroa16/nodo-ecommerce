import { rutaDesdeRaiz } from "../utils/rutas.js";
import { formatearPrecio } from "../utils/formato.js";
import { agregarAlCarrito, CANTIDAD_MINIMA, CANTIDAD_MAXIMA } from "../utils/carrito.js";
import { mostrarAviso } from "./aviso.js";

export function crearCard(producto) {
  const card = document.createElement("article");
  card.className = "producto";

  card.innerHTML = `
    <div class="producto-foto">
      <img src="${rutaDesdeRaiz(producto.imagen)}" alt="${producto.alt}" loading="lazy" width="400" height="300">
    </div>
    <div class="producto-cuerpo">
      <p class="producto-specs">${producto.specs}</p>
      <h3 class="producto-nombre">${producto.nombre}</h3>
      <p class="producto-desc">${producto.descripcion}</p>
      <div class="producto-pie">
        <span class="precio">${formatearPrecio(producto.precio)}</span>
        <div class="producto-compra">
          <div class="contador">
            <button class="contador-btn" type="button" data-accion="restar" aria-label="Restar uno">−</button>
            <span class="contador-valor" aria-live="polite">${CANTIDAD_MINIMA}</span>
            <button class="contador-btn" type="button" data-accion="sumar" aria-label="Sumar uno">+</button>
          </div>
          <button class="btn-agregar" type="button">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `;

  let cantidad = CANTIDAD_MINIMA;
  const valor = card.querySelector(".contador-valor");
  const botonRestar = card.querySelector('[data-accion="restar"]');
  const botonSumar = card.querySelector('[data-accion="sumar"]');
  const botonAgregar = card.querySelector(".btn-agregar");

  function actualizarContador() {
    valor.textContent = cantidad;
    botonRestar.disabled = cantidad === CANTIDAD_MINIMA;
    botonSumar.disabled = cantidad === CANTIDAD_MAXIMA;
  }

  botonRestar.addEventListener("click", () => {
    cantidad--;
    actualizarContador();
  });

  botonSumar.addEventListener("click", () => {
    cantidad++;
    actualizarContador();
  });

  botonAgregar.addEventListener("click", () => {
    const enCarrito = agregarAlCarrito(producto, cantidad);
    const unidades = cantidad === 1 ? "1 unidad" : `${cantidad} unidades`;

    if (enCarrito === CANTIDAD_MAXIMA) {
      mostrarAviso(`${producto.nombre}: tenés el máximo de ${CANTIDAD_MAXIMA} unidades en el carrito`);
    } else {
      mostrarAviso(`Agregaste ${unidades} de ${producto.nombre} al carrito`);
    }

    cantidad = CANTIDAD_MINIMA;
    actualizarContador();
  });

  actualizarContador();
  return card;
}
