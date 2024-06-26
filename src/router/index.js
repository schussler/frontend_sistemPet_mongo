import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/loginView.vue";
const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  {
    path: "/clients",
    name: "clients",
    component: () => import("../views/clientsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/calendarView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// Função para verificar se o token é válido
function isTokenValid(token) {
  // Implementar a lógica para verificar a validade do token
  // Isso pode incluir verificar a expiração do token ou validá-lo no servidor
  // Aqui está um exemplo simples de verificação de expiração de token JWT
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiration = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return expiration > currentTime;
  } catch (e) {
    return false;
  }
}
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Verifica se a rota requer autenticação
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Verifica se o token está presente e se é válido
    if (token && isTokenValid(token)) {
      next();
    } else {
      // Se o token não estiver presente ou for inválido, redirecione para a página de login
      next("/login");
    }
  } else {
    // Se a rota não requer autenticação, permita que o usuário acesse a rota
    next();
  }
});
export default router;
