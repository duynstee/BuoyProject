<template>
  <v-container fluid fill-height class="background-image full-height">
    <h1 class="title">Settings Page</h1>
    
    <buoy-menu class="menustyle" title="View All Buoys">
      <ul v-if="buoys.length">
        <li v-for="buoy in buoys" :key="buoy.id">{{ buoy.name }}</li>
      </ul>
      <p v-else>No buoys available</p>
    </buoy-menu>

    <buoy-menu class= "menustyle" title="Add or Delete Buoys">
      <v-form @submit.prevent="addBuoy">
        <v-text-field v-model="newBuoyName" label="Buoy Name" required></v-text-field>
        <v-btn type="submit" color="primary">Add Buoy</v-btn>
      </v-form>
      <v-form @submit.prevent="deleteBuoy" class="delete-form">
        <v-select
          v-model="buoyToDelete"
          :items="buoys"
          item-text="name"
          item-value="id"
          label="Select Buoy to Delete"
          required
        ></v-select>
        <v-btn type="submit" color="error">Delete Buoy</v-btn>
      </v-form>
    </buoy-menu>

  </v-container>
</template>

<script>
import BuoyMenu from '@/components/BuoyMenu.vue';

export default {
  name: 'SettingsPage',
  components: {
    BuoyMenu
  },
  data() {
    return {
      buoys: [
      ],
      newBuoyName: '',
      buoyToDelete: null
    };
  },
  methods: {
    addBuoy() {
      if (this.newBuoyName) {
        const newId = this.buoys.length ? this.buoys[this.buoys.length - 1].id + 1 : 1;
        this.buoys.push({ id: newId, name: this.newBuoyName });
        this.newBuoyName = '';
      }
    },
    deleteBuoy() {
      if (this.buoyToDelete !== null) {
        this.buoys = this.buoys.filter(buoy => buoy.id !== this.buoyToDelete);
        this.buoyToDelete = null;
      }
    }
  }
};
</script>

<style scoped>
.background-image {
  background-image: url("@/assets/River.jpg");
  background-size: cover;
  background-position: center;
}

.full-height {
  height: 100%;
}

.menustyle {
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.90);
  border-radius: 8px;
  padding: 20px;
}

.title {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.delete-form {
  margin-top: 40px;
}
</style>