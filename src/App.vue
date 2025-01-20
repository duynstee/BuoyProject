<template>
  <v-app>
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
    Navigation,
  },

  data: () => ({
    //
  }),
};
</script>
