<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-home">
      <i class="pi pi-home" style="font-size: 2rem; font-weight: 700"></i>
    </router-link>
    <div :class="['navbar-navigation', {closed: isOpen}]">
      <router-link to="/calendar" class="nav-item">Calendar</router-link>
      <router-link to="/tasks" class="nav-item">Tasks</router-link>
    </div>
    <i class="pi-bars pi hamburger-menu" @click="isOpen = !isOpen" style="font-size: 2rem; font-weight: 500"></i>
  </nav>
</template>

<script setup>
import {ref} from "vue";

const isOpen = ref(true);
</script>

<style scoped>
.navbar{
  width: 100% ;
  height: 60px;
  background-color: #edf2ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-home{
  color: black;
  margin: 0;
  padding-left: 100px;
}

.navbar-navigation{
  user-select: none;
  color: black;
  padding-right: 100px;
}

a{
  color: black;
  text-decoration: none;
}

.nav-item{
  padding: 0 10px;
  font-size: 16px;
  font-weight: 550;
}

.hamburger-menu{
  display: none;
  padding-right: 100px;
}

.closed{
  display: block;
}

@media (max-width: 600px) {
  .navbar {
    position: relative;
  }
  .navbar-navigation{
    position: absolute;
    top: 60px;
    width: 100%;
    background-color: #edf2ff;
    text-align: center;
    padding: 0;
  }
  .nav-item{
    display: block;
    padding: 5px 0;
  }
  .hamburger-menu{
    display: block;
  }
  .closed{
    display: none;
  }
}
</style>