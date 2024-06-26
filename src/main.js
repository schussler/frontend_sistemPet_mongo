import { createApp } from "vue";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Importar os ícones MDI

// sweetAlert2

// main.js

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
// Components
import App from "./App.vue";
import router from "./router";
import store from "./store";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: prefersDark ? "dark" : "light",
    themes: {
      light: {
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
        },
      },
      dark: {
        colors: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
        },
      },
    },
  },
});

// toast config

// Use sweetalert2
// window.Toast.fire({
//   icon: "success",
//   title: "Signed in successfully",
// });
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
// importa a cost Toast para todo o sistema
window.Toast = Toast;

const app = createApp(App);
app.use(vuetify);
app.use(VueSweetalert2);
app.use(store);
app.use(router);
app.mount("#app");

// Detectar mudança na preferência de tema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    vuetify.theme.global.name = newTheme;
    window.location.reload(); // Recarrega a página
  });
