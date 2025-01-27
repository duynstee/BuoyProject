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
import { jwtDecode } from "jwt-decode";

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
    handleLogin() {
  if (!this.username || !this.password) {
    this.errorMessages = "Username and password are required.";
    return;
  }

  try {
    // Create JWT Header
    const header = {
      alg: "HS256", // Hashing algorithm
      typ: "JWT",
    };

    // Create JWT Payload
    const payload = {
      username: this.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
    };

    // Base64-encode the header and payload
    const base64Encode = (obj) =>
      btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

    const encodedHeader = base64Encode(header);
    const encodedPayload = base64Encode(payload);

    // Create a dummy signature (Note: Real JWTs use a secret key for the signature)
    const dummySecret = "mock_secret";
    const signature = base64Encode(`${encodedHeader}.${encodedPayload}.${dummySecret}`);

    // Concatenate parts to form the JWT
    const token = `${encodedHeader}.${encodedPayload}.${signature}`;

    // Save the token to localStorage
    localStorage.setItem("token", token);

    // Redirect or reload the app
    location.reload();
    this.$router.push("/");
  } catch (error) {
    console.error("Error logging in:", error);
    this.errorMessages = "An error occurred.";
  }
}
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
