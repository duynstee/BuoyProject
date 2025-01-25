import { createRouter, createWebHistory } from "vue-router";
import * as jwtDecode from "jwt-decode";

// Import your page components
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import SettingsPage from "../views/SettingsPage.vue";

// Define routes
const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/settings", name: "Settings", component: SettingsPage, meta: { requiresAuth: true } },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware for route authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");

    if (!token) {
      next({ name: "Login" }); // No token, redirect to login
    } else {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp < currentTime) {
          console.error("Token expired");
          localStorage.removeItem("token"); // Remove expired token
          next({ name: "Login" }); // Redirect to login
        } else {
          next(); // Token is valid, proceed
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token"); // Remove invalid token
        next({ name: "Login" }); // Redirect to login
      }
    }
  } else {
    next(); // Route does not require authentication, proceed normally
  }
});

export default router;
