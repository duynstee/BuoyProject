<template>
  <v-container fluid fill-height class="background-image">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" md="4">
        <login-form></login-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  methods: {
    handleLoginSuccess() {
      this.$emit("login-success");
      console.log("Login button clicked");
    },
  },
};
</script>

<style scoped>
.v-container,
.v-row {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.background-image {
  background-image: url("@/assets/krugerpark.jpg");
  background-size: cover;
  background-position: center;
}
</style>
