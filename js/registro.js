import { rutaDePagina } from "./utils/rutas.js";

const formulario = document.querySelector(".caja-form form");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  window.location.href = rutaDePagina("login");
});
