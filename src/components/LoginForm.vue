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
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          required
        ></v-text-field>
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
export default {
  data() {
    return {
      username: "",
      password: "",
      formValid: false,
    };
  },
  methods: {
    handleLogin() {
      // Here you would send the login request to your backend or authentication service
      console.log("Username:", this.username);
      console.log("Password:", this.password);
    },
  },
};
</script>

<style scoped>
.login-card {
  background-color: rgba(255, 255, 255, 0.90);
  border-radius: 8px;
  padding: 20px;
}
</style>
