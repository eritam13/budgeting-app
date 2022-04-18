<template>
   <div class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center bg-gray-50">
        <DataTable :value="personalInfo">
          <Column field="id" header="Id" />
          <Column field="name" header="Name" />
          <Column field="surname" header="Surname" />
          <Column field="birthday" header="Birthday" />
          <Column>
          <template #body="{ data }">
            <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
            text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="edit(data)">
            Edit
            </button>
          </template>
          </Column> 
        </DataTable>
    </div>
    
          
  </div>
</template>

<script setup lang="ts">

import {usePersonalInfoStore} from '@/stores/personalInfoStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EditPersonalInfoVue from '@/components/EditPersonalInfo.vue';
import { PersonalInfo } from '@/modules/personalinfo'

const personalInfoStore = usePersonalInfoStore();
const  {personalInfo}  = storeToRefs(personalInfoStore);
const router = useRouter();
const {loadInfoById}=usePersonalInfoStore();
onMounted(() => {
  personalInfoStore.load();
});

const edit = (personalInfo:PersonalInfo) => {
  loadInfoById(personalInfo.id!)
  router.addRoute({path:'/personalinfo/'+personalInfo.id, name:'EditPersonalInfo',component:EditPersonalInfoVue})
  router.push({path:'/personalinfo/'+personalInfo.id, name:'EditPersonalInfo'})
};
</script>