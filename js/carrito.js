import {
  obtenerCarrito,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  contarUnidades,
  calcularTotal,
  CANTIDAD_MINIMA,
  CANTIDAD_MAXIMA
} from "./utils/carrito.js";
import { obtenerUsuario } from "./utils/sesion.js";
import { rutaDesdeRaiz, rutaDePagina } from "./utils/rutas.js";
import { formatearPrecio } from "./utils/formato.js";
import { mostrarAviso } from "./components/aviso.js";

const contenedor = document.querySelector("#carrito");

function crearItem(item) {
  return `
    <li class="item-carrito" data-id="${item.id}">
      <img class="item-foto" src="${rutaDesdeRaiz(item.imagen)}" alt="${item.alt}" width="96" height="72">
      <div class="item-info">
        <h2 class="item-nombre">${item.nombre}</h2>
        <p class="item-precio">${formatearPrecio(item.precio)} c/u</p>
      </div>
      <div class="contador item-contador">
        <button class="contador-btn" type="button" data-accion="restar" aria-label="Restar uno de ${item.nombre}"${item.cantidad === CANTIDAD_MINIMA ? " disabled" : ""}>−</button>
        <span class="contador-valor">${item.cantidad}</span>
        <button class="contador-btn" type="button" data-accion="sumar" aria-label="Sumar uno de ${item.nombre}"${item.cantidad === CANTIDAD_MAXIMA ? " disabled" : ""}>+</button>
      </div>
      <p class="item-subtotal">${formatearPrecio(item.precio * item.cantidad)}</p>
      <button class="btn-eliminar" type="button" data-accion="eliminar" aria-label="Eliminar ${item.nombre} del carrito">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </li>
  `;
}

function crearResumen(carrito) {
  const unidades = contarUnidades(carrito);

  return `
    <aside class="carrito-resumen" aria-labelledby="titulo-resumen">
      <h2 id="titulo-resumen">Resumen</h2>
      <p class="resumen-fila">
        <span>Productos (${unidades})</span>
        <span>${formatearPrecio(calcularTotal(carrito))}</span>
      </p>
      <p class="resumen-fila">
        <span>Envío</span>
        <span>Gratis</span>
      </p>
      <p class="resumen-fila resumen-total">
        <span>Total</span>
        <span class="precio">${formatearPrecio(calcularTotal(carrito))}</span>
      </p>
      <button class="btn-enviar" type="button" data-accion="comprar">Finalizar compra</button>
      <p class="resumen-nota"></p>
      <div class="resumen-acciones">
        <a href="${rutaDePagina("home")}">Seguir comprando</a>
        <button class="btn-texto" type="button" data-accion="vaciar">Vaciar carrito</button>
      </div>
    </aside>
  `;
}

function mostrarMensaje(titulo, texto) {
  contenedor.innerHTML = `
    <div class="carrito-vacio">
      <h2></h2>
      <p></p>
      <a class="btn-accion" href="${rutaDePagina("home")}">Ver productos</a>
    </div>
  `;
  contenedor.querySelector("h2").textContent = titulo;
  contenedor.querySelector("p").textContent = texto;
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    mostrarMensaje("Tu carrito está vacío", "Recorré las categorías y sumá lo que necesites para tu setup.");
    return;
  }

  contenedor.innerHTML = `
    <ul class="carrito-lista" aria-label="Productos en el carrito">
      ${carrito.map(crearItem).join("")}
    </ul>
    ${crearResumen(carrito)}
  `;

  const usuario = obtenerUsuario();
  contenedor.querySelector(".resumen-nota").textContent = usuario
    ? `Comprás como ${usuario.email}`
    : "Para finalizar la compra vas a tener que iniciar sesión.";
}

function finalizarCompra() {
  const usuario = obtenerUsuario();

  if (!usuario) {
    window.location.href = rutaDePagina("login", { volver: "carrito" });
    return;
  }

  vaciarCarrito();
  mostrarMensaje(
    `¡Gracias por tu compra, ${usuario.nombre}!`,
    `Te enviamos el detalle del pedido a ${usuario.email}.`
  );
}

// Un solo listener para todos los botones del carrito (delegación de eventos).
contenedor.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-accion]");
  if (!boton) {
    return;
  }

  const accion = boton.dataset.accion;

  if (accion === "comprar") {
    finalizarCompra();
    return;
  }

  if (accion === "vaciar") {
    vaciarCarrito();
    mostrarAviso("Vaciaste el carrito");
    mostrarCarrito();
    return;
  }

  const id = Number(boton.closest(".item-carrito").dataset.id);
  const item = obtenerCarrito().find((item) => item.id === id);

  if (accion === "sumar") {
    cambiarCantidad(id, item.cantidad + 1);
  } else if (accion === "restar") {
    cambiarCantidad(id, item.cantidad - 1);
  } else if (accion === "eliminar") {
    quitarDelCarrito(id);
    mostrarAviso(`Quitaste ${item.nombre} del carrito`);
  }

  mostrarCarrito();
  enfocarDespuesDeCambio(id, accion);
});

// Al redibujar se pierde el foco: lo devolvemos al mismo botón (o al título
// si el producto se eliminó) para que se pueda seguir usando con teclado.
function enfocarDespuesDeCambio(id, accion) {
  const boton = contenedor.querySelector(`[data-id="${id}"] [data-accion="${accion}"]`);
  if (boton && !boton.disabled) {
    boton.focus();
  } else {
    document.querySelector("main h1").focus();
  }
}

// Si el carrito cambia en otra pestaña, se vuelve a dibujar.
window.addEventListener("storage", mostrarCarrito);

mostrarCarrito();
