import { createRouter, createWebHistory } from "vue-router";

// Import your page components here
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import SettingsPage from "../views/SettingsPage.vue";

// Define routes
const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/settings", name: "Settings", component: SettingsPage },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
