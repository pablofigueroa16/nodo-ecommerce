// tipo: "inicio", "categoria", "carrito" o "cuenta".
// El navbar muestra solo las categorías: al inicio se vuelve con el logo.
export const paginas = [
  { id: "home", titulo: "Inicio", ruta: "index.html", tipo: "inicio" },
  { id: "notebooks", titulo: "Notebooks", ruta: "pages/notebooks.html", tipo: "categoria" },
  { id: "perifericos", titulo: "Periféricos", ruta: "pages/perifericos.html", tipo: "categoria" },
  { id: "audio", titulo: "Audio", ruta: "pages/audio.html", tipo: "categoria" },
  { id: "componentes", titulo: "Componentes", ruta: "pages/componentes.html", tipo: "categoria" },
  { id: "carrito", titulo: "Carrito", ruta: "pages/carrito.html", tipo: "carrito" },
  { id: "login", titulo: "Iniciar sesión", ruta: "pages/login.html", tipo: "cuenta" },
  { id: "registro", titulo: "Crear cuenta", ruta: "pages/registro.html", tipo: "cuenta" }
];

export const categorias = paginas.filter((pagina) => pagina.tipo === "categoria");
