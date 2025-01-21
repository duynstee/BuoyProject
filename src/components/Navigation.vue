<template>
  <v-app-bar app theme="dark" color="primary">
    <v-toolbar-title>Boeien data</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text>
      <router-link to="/">Home</router-link>
    </v-btn>
    <v-btn text>
      <router-link to="/login">Login</router-link>
    </v-btn>
    <v-btn text>
      <router-link to="/settings">Settings</router-link>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

<style>
router-link {
  text-decoration: none;
  color: inherit;
}
</style>
