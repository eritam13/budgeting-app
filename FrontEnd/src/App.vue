<template>
  <div class="sidebar"  >
  <router-link to="/recordList">
      <img src="@/assets/Wallet.png" alt="Logo" width="600" height="60">
    </router-link>
    
    <router-link
      to="/recordlist"
      class="text-black hover:bg-green-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
      
      active-class="bg-gray-500 text-white"
      aria-current="page"
      >Dashboard</router-link
    >
    <router-link
      to="/addrecord"
      class="text-black hover:bg-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      active-class="bg-gray-500 text-white"
      >Add record</router-link
    >
    <router-link
      to="/report"
      class="text-black hover:bg-gray-400  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      active-class="bg-gray-500 text-white"
      >Report</router-link
    >
    <router-link
      to="/personalinfo"
      class="text-black hover:bg-gray-400  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      active-class="bg-gray-500 text-white"
      >Personal Info</router-link
    >
    <button
    type="button"
    v-if="isAuthenticated"
    class=" text-black hover:bg-gray-400  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    style="background-color:rgb(219, 124, 124); width: 100%; border-radius: 3px;
    border: 2px solid #333333;
    position:absolute;
    bottom:0;"
    @click="signOut"
  >
  Logi välja
</button>
  </div>
  <router-view />
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
import router from './router';
import { useAuthStore } from './stores/authStore';



const authStore = useAuthStore();
const { logout } = authStore;
const { isAuthenticated } = storeToRefs(authStore);

const signOut = () => {
  logout();
  router.push({ name: 'login' });
};

</script>

<style>
  /* @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap'); */
  html {
    
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    background-color:rgb(234, 234, 247);
  }
  body {
    width: 100%;
    
    position: fixed;
    font-family: 'Montserrat', sans-serif;
    background-color:rgb(234, 234, 247);
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    height: 100%;
  }
  #app {
 
    font-family: 'Montserrat', sans-serif;
   background-color:rgb(234, 234, 247);
    
  }
  * {
    
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }
  .main-container {
    
    margin: 50px;
    min-height: 250px;
  }
  .sidebar{
   
    background-color:rgb(228, 214, 214) ;
    
    z-index: 2; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    float: left;
    height: 100%;
    position: fixed;
    margin: auto;
    
  }
  h1 {
   
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
  a{
    width: 10%;
    display: block;
    width: 100px;
    margin: auto;
  } 
  router-link{
    width: 10%;
    position: fixed;
    display: block;
    margin: auto;
  } 
</style>

