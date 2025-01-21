<template>
  <v-container>
    <h1>Settings Page</h1>
    <buoy-menu class= "menu" title="View All Buoys">
      <!-- Content for viewing all buoys goes here -->
    </buoy-menu>
    <buoy-menu title="Add or Delete Buoys">
      <!-- Content for adding or deleting buoys goes here -->
    </buoy-menu>
  </v-container>
</template>

<script>
import BuoyMenu from '@/components/BuoyMenu.vue';

export default {
  name: 'SettingsPage',
  components: {
    BuoyMenu
  }
};
</script>

<style scoped>
.menu {
  margin-bottom: 20px;
}
</style>