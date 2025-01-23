<template>
  <v-card class="login-card">
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>

    <v-card-text>
      <v-form v-model="formValid">
        <v-text-field
          v-model="username"
          label="Username"
          outlined
          required
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          required
          :rules="[rules.required]"
        ></v-text-field>

        <p v-if="errorMessages" class="error-message">{{ errorMessages }}</p>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn :disabled="!formValid" color="primary" @click="handleLogin">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      password: "",
      formValid: false,
      errorMessages: "",
      rules: {
        required: (value) => !!value || "Required."
      },
      protectedData: null,
    };
  },
  methods: {
    async handleLogin() {
      console.log("Login button clicked");
      console.log("Username:", this.username);
      console.log("Password:", this.password);

      if (!this.username || !this.password) {
        this.errorMessages = "Username and password are required.";
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });

        const token = response.data.token;
        console.log("Received token:", token); // Log the token to the console
        localStorage.setItem("token", token);

        this.$emit("login-success");

        // Verify if the token is saved in local storage
        const savedToken = localStorage.getItem("token");
        console.log("Saved token in local storage:", savedToken);

        this.$router.push({ name: "Settings" }); // Navigate to settings page
      } catch (error) {
        this.errorMessages =
          error.response?.data?.message || "An error occurred.";
        console.error("Error logging in:", error);
      }
    },
    async fetchProtectedData() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessages = "No token found. Please log in.";
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/protected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.protectedData = response.data;
      } catch (error) {
        this.errorMessages = error.response?.data?.message || "An error occurred.";
        console.error("Error fetching protected data:", error);
      }
    }
  },
  mounted() {
    this.fetchProtectedData();
  }
};
</script>

<style scoped>
.login-card {
  background-color: rgba(255, 255, 255, 0.90);
  border-radius: 8px;
  padding: 20px;
}
</style>
