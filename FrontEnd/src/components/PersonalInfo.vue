<template>
   <div class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center bg-gray-50">
        <DataTable :value="personalInfo">
          <Column field="name" header="Name" />
          <Column field="surname" header="Surname" />
          <Column field="birthday" header="Birthday" />
           <router-link :to="'/personalinfo/1'" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
            text-white bg-green-600 hover:bg-green-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit2</router-link>
        </DataTable>
    </div>
       <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
            text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="submitForm">
            Edit
          </button>
          
          
  </div>
</template>

<script setup lang="ts">

import {usePersonalInfoStore} from '@/stores/personalInfoStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import EditPersonalInfo from '@/components/EditPersonalInfo.vue';
defineProps<{ title: string }>();

const personalInfoStore = usePersonalInfoStore();
const  {personalInfo}  = storeToRefs(personalInfoStore);
onMounted(() => {
  personalInfoStore.load();
});

</script>