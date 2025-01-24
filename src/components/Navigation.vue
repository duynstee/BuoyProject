<template>
  <v-app-bar app theme="dark" color="green">
    <v-toolbar-title class="title">
      <router-link to="/" class="nav-link">
        <v-icon size="48px" class="icon">mdi-elephant</v-icon>
        Buoy data</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn text>
      <router-link to="/" class="nav-link">
        <v-icon>mdi-home</v-icon>
        Home</router-link>
    </v-btn>

    <v-btn text>
      <router-link to="/settings" class="nav-link">
        <v-icon>mdi-cog</v-icon>
        Settings
      </router-link>
    </v-btn>

    <v-btn text v-if="!isLoggedIn">
      <router-link to="/login" class="nav-link">
        <v-icon>mdi-account</v-icon>
        Login
      </router-link>
    </v-btn>
    <v-btn text v-else @click="logout">
      <v-icon>mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const token = ref(localStorage.getItem("token"));
const isLoggedIn = ref(!!token.value);

watchEffect(() => {
  isLoggedIn.value = !!token.value;
});

function logout() {
  localStorage.removeItem("token");
  token.value = null;
  router.push({ name: "Home" });
}

document.addEventListener("login-success", () => {
  token.value = localStorage.getItem("token");
});
</script>

<style scoped>
router-link {
  text-decoration: none;
  color: inherit;
}

.title {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
  font-weight: bold;
}

.nav-link {
  text-decoration: none;
}

.nav-link:visited,
.nav-link:active,
.nav-link:hover {
  color: inherit;
}

.icon {
  margin-right: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}
</style>
