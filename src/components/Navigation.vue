<template>
  <v-app-bar app theme="dark" color="primary">
    <v-toolbar-title>
      <v-icon size= "48px" class="icon">mdi-elephant</v-icon>
      Buoy data</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text>
      <router-link to="/" class="nav-link">
        <v-icon>mdi-home</v-icon>
        Home</router-link>
    </v-btn>
    <v-btn text>
      <router-link to="/login" class="nav-link">
        <v-icon>mdi-account</v-icon>
        Login</router-link>
    </v-btn>
    <v-btn text>
      <router-link to="/settings" class="nav-link">
        <v-icon>mdi-cog</v-icon>
        Settings</router-link>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

<style scoped>
router-link {
  text-decoration: none;
  color: inherit;
}

.nav-link:visited,
.nav-link:active,
.nav-link:hover {
  color: inherit;
}

.icon {
  margin-right: 16px;
}
</style>
