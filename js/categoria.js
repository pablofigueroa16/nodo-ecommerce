import { obtenerProductos } from "./services/productos.js";
import { crearCard } from "./components/card.js";
import { crearEstado } from "./components/estado.js";

const grilla = document.querySelector(".grilla[data-categoria]");
const categoria = grilla.dataset.categoria;

async function mostrarProductos() {
  grilla.replaceChildren(crearEstado("Cargando productos…"));

  try {
    const productos = await obtenerProductos();
    const deLaCategoria = productos.filter((producto) => producto.categoria === categoria);

    if (deLaCategoria.length === 0) {
      grilla.replaceChildren(crearEstado("Todavía no hay productos en esta categoría."));
      return;
    }

    grilla.replaceChildren(...deLaCategoria.map(crearCard));
  } catch (error) {
    console.error(error);
    grilla.replaceChildren(
      crearEstado("No pudimos cargar los productos. Probá recargar la página en unos minutos.", true)
    );
  }
}

mostrarProductos();
