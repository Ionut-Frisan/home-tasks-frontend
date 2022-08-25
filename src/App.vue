<script setup>
  import Navbar from "../src/components/Navbar.vue";
  import Toast from 'primevue/toast';
</script>

<template>
  <div>
    <Navbar></Navbar>
    <Toast></Toast>
    <router-view />
  </div>
</template>

<style>
body{
  padding: 0;
  margin: 0;
}
</style>
