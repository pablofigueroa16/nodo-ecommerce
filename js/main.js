import { renderNavbar } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";

const navbar = document.querySelector(".navbar");
const footer = document.querySelector("footer");

if (navbar) {
  renderNavbar(navbar);
}

if (footer) {
  renderFooter(footer);
}
