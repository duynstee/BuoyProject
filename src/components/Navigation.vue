<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item-group>
        <v-list-item>
          <router-link to="/">Home</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/login">Login</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/settings">Settings</router-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
};
</script>

<style></style>
