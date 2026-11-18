import { iniciarSesion } from "./utils/sesion.js";
import { buscarUsuario } from "./utils/usuarios.js";
import { rutaDePagina, existePagina } from "./utils/rutas.js";

const formulario = document.querySelector(".caja-form form");
const parametros = new URLSearchParams(window.location.search);

// Página a la que se vuelve después de ingresar (por ejemplo, el carrito).
const volver = existePagina(parametros.get("volver")) ? parametros.get("volver") : "home";

// Si viene del registro, el email ya queda completo.
const emailRegistrado = sessionStorage.getItem("nodo-email-registrado");
if (emailRegistrado) {
  sessionStorage.removeItem("nodo-email-registrado");
  formulario.email.value = emailRegistrado;
  formulario.password.focus();
}

// El link a "Registrate" conserva la página de destino.
if (volver !== "home") {
  document.querySelector(".pie-form a").href = rutaDePagina("registro", { volver });
}

// Sin registro previo, el nombre sale de la parte del email antes de la @.
function nombreDesdeEmail(email) {
  const nombre = email.split("@")[0];
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const email = formulario.email.value.trim().toLowerCase();
  const registrado = buscarUsuario(email);

  iniciarSesion({
    nombre: registrado ? registrado.nombre : nombreDesdeEmail(email),
    apellido: registrado ? registrado.apellido : "",
    email
  });

  window.location.href = rutaDePagina(volver);
});
