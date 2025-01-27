<template>
  <v-container fluid fill-height class="background-image full-height">
    <h1 class="title">Settings Page</h1>

    <buoy-menu class="menustyle" title="View All Buoys">
      <ul v-if="buoys.length">
        <li v-for="buoy in buoys" :key="buoy.id">{{ buoy.name }}</li>
      </ul>
      <p v-else>No buoys available</p>
    </buoy-menu>

    <buoy-menu class="menustyle" title="Add or Delete Buoys">
      <v-btn color="primary" @click="showAddBuoyDialog = true">Add Buoy</v-btn>
      <v-form @submit.prevent="deleteBuoy" class="delete-form">
        <v-select
          v-model="buoyToDelete"
          :items="buoys"
          item-title="name"
          item-text="name"
          item-value="id"
          label="Select Buoy to Delete"
          required
        ></v-select>
        <v-btn type="submit" color="error">Delete Buoy</v-btn>
      </v-form>
    </buoy-menu>

    <!-- Buoy popup-->
    <v-dialog v-model="showAddBuoyDialog" max-width="500px">
      <v-card>
        <v-card-title>Add a New Buoy</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addBuoy">
            <v-text-field
              v-model="newBuoyName"
              label="Buoy Name"
              required
            ></v-text-field>
            <div>
              <p>Enable Sensors:</p>
              <v-switch
                v-for="sensor in sensors"
                :key="sensor.name"
                v-model="sensor.enabled"
                :label="sensor.name"
                color="blue"
                inset
              ></v-switch>
            </div>
          </v-form>
          <v-btn color="info" block @click="mapPicker = true"
            >Pick Location</v-btn
          >
          <p v-if="selectedLocation">
            Selected Location: Lat {{ selectedLocation.lat }}, Lng
            {{ selectedLocation.lng }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addBuoy">Add</v-btn>
          <v-btn color="secondary" @click="showAddBuoyDialog = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Map Dialog -->
    <v-dialog v-model="mapPicker" max-width="800px" persistent>
      <v-card>
        <v-card-title>Pick a Location</v-card-title>
        <v-card-text>
          <map-picker
            :buoys="buoys"
            @location-selected="setLocation"
          ></map-picker>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="confirmLocation">Confirm</v-btn>

          <v-btn color="secondary" @click="cancelLocationSelection"
            >cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div style="width: 100%; height: 75vh">
      <Map />
    </div>
  </v-container>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BuoyMenu from "@/components/BuoyMenu.vue";
import MapPicker from "@/components/MapPicker.vue";

export default {
  name: "SettingsPage",
  components: {
    BuoyMenu,
    MapPicker,
  },
  data() {
    return {
      buoys: [],
      newBuoyName: "",
      buoyToDelete: null,
      showAddBuoyDialog: false,
      mapPicker: false,
      selectedLocation: null,
      sensors: [
        { name: "pH", enabled: false },
        { name: "Oxygen", enabled: false },
        { name: "Temperature", enabled: false },
        { name: "Turbidity", enabled: false },
        { name: "Electrical Conductivity", enabled: false },
      ],
      errorMessages: "",
    };
  },
  methods: {
    addBuoy() {
      if (this.newBuoyName && this.selectedLocation) {
        const newId = this.buoys.length
          ? this.buoys[this.buoys.length - 1].id + 1
          : 1;
        const newBuoy = {
          id: newId,
          name: this.newBuoyName,
          sensors: this.sensors.map((sensor) => ({
            name: sensor.name,
            enabled: sensor.enabled,
          })),
          location: this.selectedLocation,
        };

        this.buoys.push(newBuoy);
        this.newBuoyName = "";
        this.sensors.forEach((sensor) => (sensor.enabled = false));
        this.selectedLocation = null;
        this.showAddBuoyDialog = false;

        selectedLocation = null;
      }
    },
    deleteBuoy() {
      if (this.buoyToDelete !== null) {
        this.buoys = this.buoys.filter((buoy) => buoy.id !== this.buoyToDelete);
        this.buoyToDelete = null;
      }
    },
    setLocation(location) {
      this.selectedLocation = location;
    },
    cancelLocationSelection() {
      // Update the final selected location and close the map picker
      this.selectedLocation = this.temporaryLocation;
      this.mapPicker = false;
    },
    confirmLocation() {
      // Discard the temporary location and close the map picker
      this.temporaryLocation = null;
      this.mapPicker = false;
    },
    async addUser() {
      if (this.newUsername && this.newPassword) {
        try {
          const response = await axios.post(
            "http://localhost:3000/addUser",
            {
              username: this.newUsername,
              password: this.newPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(`User added: ${response.data.message}`);
          this.newUsername = "";
          this.newPassword = "";
        } catch (error) {
          console.error("Error adding user: ", error);
        }
      }
    },
    // Token check before rendering
    checkToken() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.errorMessages = "No token found. Please log in.";
          this.$router.push("/login");
          return;
        }

        const decodedToken = jwtDecode(token); // Decode the token
        console.log("Decoded token:", decodedToken);

        // Check if token has expired
        if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
          this.errorMessages = "Token expired. Please log in again.";
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        this.errorMessages = "Invalid token. Please log in again.";
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    this.checkToken(); // Check the token when the page is loaded
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
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 20px;
}

.title {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

</style>