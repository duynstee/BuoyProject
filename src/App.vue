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
import LineChart from "./components/LineChart.vue";
import BuoyMenu from "./components/BuoyMenu.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
    Navigation,
    LineChart,
    BuoyMenu,
  },

  data: () => ({
    //
  }),
};
</script>
