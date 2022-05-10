<template>
  <nav class="bg-purple-400">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link to="/">
                <img src="@/assets/Wallet.png" alt="Logo" width="40" height="32">
              </router-link>
              <router-link
                to="/"
                class="text-green-300 hover:bg-green-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                active-class="bg-gray-900 text-white"
                aria-current="page"
                >Dashboard</router-link
              >
              <router-link
                to="/addrecord"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                active-class="bg-gray-900 text-white"
                >Add record</router-link
              >
              <router-link
                to="/report"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                active-class="bg-gray-900 text-white"
                >Report</router-link
              >
              <router-link
                to="/personalinfo"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                active-class="bg-gray-900 text-white"
                >Personal Info</router-link
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ml-3 relative"
        >
          <button
            type="button"
            v-if="isAuthenticated"
            class="text-white ring-gray-400 px-2 flex text-sm rounded-full focus:outline-none ring-2"
            @click="signOut"
          >
            Logi välja
          </button>
        </div>
      </div>
    </div>
  </nav>
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


  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  html, body {
    font-family: 'Montserrat', sans-serif;
    background-color:#fff;
  }
  #app {
    font-family: 'Montserrat', sans-serif;
    background-color:#fff ;
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
  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
</style>
