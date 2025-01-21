<template>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'BuoyMenu',
    props: {
      title: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for the menu component here */
  </style>