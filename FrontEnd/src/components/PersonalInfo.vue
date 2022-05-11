<template>
   <div class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style="margin-left: 10%; width: auto; background-color:rgb(230, 230, 245);">
    <div class="text-center bg-gray-50">
        <div style="font-size:50px; margin-right:50%;">
          Username: 
        </div>
        <div style="font-size:50px; margin-right:50%">
          {{user?.username}}
        </div>
        <div style="font-size:50px; margin-right:50%">
          Password: 
          <div v-if="displayPass==false">#######</div>
          <div v-else>{{user?.password}}</div>
        </div>
        <button style="position:absolute; top:15%; right:10%; font-size:50px; padding:25px 10px 25px 10px;" v-if="displayPass==false" @click="buttonPress()" 
        class="focus:ring-indigo-500  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >display password</button>
        <button style="position:absolute; top:15%; right:10%; font-size:50px; padding:25px 10px 25px 10px;" v-if="displayPass==true" @click="buttonPress()"
        class="focus:ring-indigo-500  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >hide password</button>
    </div>
    
          
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { onMounted,ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
let displayPass:Ref<boolean> = ref(false);
const {user} = storeToRefs(useAuthStore());
const router = useRouter();
onMounted(() => {

});
const buttonPress = ()=>{
  if (displayPass.value==false)
  {
    displayPass.value=true;
  }
  else(displayPass.value=false)
}
</script>