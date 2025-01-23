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

    <buoy-menu class="menustyle" title="Add Users">
      <v-form @submit.prevent="addUser">
        <v-text-field v-model="newUsername" label="Username" required></v-text-field>
        <v-text-field v-model="newPassword" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="primary">Add User</v-btn>
      </v-form>
    </buoy-menu>

  </v-container>
</template>

<script>
import axios from 'axios';
import BuoyMenu from '@/components/BuoyMenu.vue';

export default {
  name: 'SettingsPage',
  components: {
    BuoyMenu
  },
  data() {
    return {
      buoys: [],
      newBuoyName: '',
      buoyToDelete: null,
      newUsername: '',
      newPassword: ''
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
    },
    async addUser() {
      if (this.newUsername && this.newPassword) {
        try {
          const response = await axios.post('http://localhost:3000/addUser', {
            username: this.newUsername,
            password: this.newPassword
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log(`User added: ${response.data.message}`);
          this.newUsername = '';
          this.newPassword = '';  
        } catch (error) {
          console.error('Error adding user: ', error);
        }
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