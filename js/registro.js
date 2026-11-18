import { registrarUsuario } from "./utils/usuarios.js";
import { rutaDePagina, existePagina } from "./utils/rutas.js";

const formulario = document.querySelector(".caja-form form");
const volver = new URLSearchParams(window.location.search).get("volver");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const email = formulario.email.value.trim().toLowerCase();

  registrarUsuario({
    nombre: formulario.nombre.value.trim(),
    apellido: formulario.apellido.value.trim(),
    email,
    nacimiento: formulario.nacimiento.value
  });

  // El login completa el email solo. Se pasa por sessionStorage y no por la
  // URL para que el dato personal no quede en el historial del navegador.
  sessionStorage.setItem("nodo-email-registrado", email);

  const parametros = existePagina(volver) ? { volver } : {};
  window.location.href = rutaDePagina("login", parametros);
});
