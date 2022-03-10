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
                to="/records"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                active-class="bg-gray-900 text-white"
                >Records</router-link
              >
              <router-link
                to="/report"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                active-class="bg-gray-900 text-white"
                >Report</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>