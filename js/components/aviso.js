// Mensaje breve que aparece abajo de la pantalla y se va solo.
let aviso;
let temporizador;

export function mostrarAviso(mensaje) {
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.className = "aviso";
    aviso.setAttribute("role", "status");
    document.body.append(aviso);
  }

  aviso.textContent = mensaje;
  aviso.classList.add("visible");

  clearTimeout(temporizador);
  temporizador = setTimeout(() => aviso.classList.remove("visible"), 2600);
}
