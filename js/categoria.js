import { productos } from "./data/productos.js";
import { crearCard } from "./components/card.js";

const grilla = document.querySelector(".grilla[data-categoria]");
const categoria = grilla.dataset.categoria;

productos
  .filter((producto) => producto.categoria === categoria)
  .forEach((producto) => grilla.append(crearCard(producto)));
