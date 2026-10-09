import { iniciarSesion } from "./utils/sesion.js";

const formulario = document.querySelector(".caja-form form");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const email = formulario.email.value.trim();
  iniciarSesion(email);
});
