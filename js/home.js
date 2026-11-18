import { categorias } from "./data/paginas.js";
import { obtenerProductos } from "./services/productos.js";
import { crearCard } from "./components/card.js";
import { crearEstado } from "./components/estado.js";
import { obtenerUsuario } from "./utils/sesion.js";
import { rutaDesdeRaiz, rutaDePagina } from "./utils/rutas.js";

// Cuántos productos de cada categoría se muestran en el home.
const PRODUCTOS_POR_CATEGORIA = 3;

const contenedor = document.querySelector("#destacados");

function personalizarHero() {
  const usuario = obtenerUsuario();
  if (!usuario) {
    return;
  }

  document.querySelector(".hero-eyebrow").textContent = `Hola, ${usuario.nombre}`;

  const botonCuenta = document.querySelector("[data-hero-cuenta]");
  botonCuenta.textContent = "Ver mi carrito";
  botonCuenta.href = rutaDePagina("carrito");
}

function crearSeccion(categoria, productos) {
  const seccion = document.createElement("section");
  seccion.className = "seccion-categoria";
  seccion.setAttribute("aria-labelledby", `titulo-${categoria.id}`);

  seccion.innerHTML = `
    <div class="seccion-encabezado">
      <h2 id="titulo-${categoria.id}">${categoria.titulo}</h2>
      <a class="link-ver-todo" href="${rutaDesdeRaiz(categoria.ruta)}">Ver todo ${categoria.titulo.toLowerCase()} &rarr;</a>
    </div>
  `;

  const grilla = document.createElement("div");
  grilla.className = "grilla";
  productos.forEach((producto) => grilla.append(crearCard(producto)));
  seccion.append(grilla);

  return seccion;
}

async function mostrarDestacados() {
  contenedor.replaceChildren(crearEstado("Cargando productos…"));

  try {
    const productos = await obtenerProductos();

    const secciones = categorias.map((categoria) => {
      const destacados = productos
        .filter((producto) => producto.categoria === categoria.id)
        .slice(0, PRODUCTOS_POR_CATEGORIA);
      return crearSeccion(categoria, destacados);
    });

    contenedor.replaceChildren(...secciones);
  } catch (error) {
    console.error(error);
    contenedor.replaceChildren(
      crearEstado("No pudimos cargar los productos. Probá recargar la página en unos minutos.", true)
    );
  }
}

personalizarHero();
mostrarDestacados();
