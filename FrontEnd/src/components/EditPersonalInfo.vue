<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <h1 class="font-bold">EDIT</h1>
          <div>
            <label for="name">name</label>
            <input
              
              id="name"
              name="name"
              v-model="personalInfo.name"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="name"
            />
          </div>
          <div>
            <label for="surname">surname</label>
            <textarea
              id="surname"
              name="surname"
              v-model="personalInfo.surname"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="surname"
            />
          </div>
          <div>
            <label for="birthday">birthday</label>
            <dd></dd>
            <input type="birthday" id="birthday" name="birthday" v-model="personalInfo.birthday" />
            <dd></dd>
          </div>
        <div>
          <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="submitForm"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { PersonalInfo } from '@/modules/personalinfo';
import { usePersonalInfoStore } from '@/stores/personalInfoStore';
import { cloneVNode, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';

const  {updatePersonalInfo, loadInfoById,load}  = usePersonalInfoStore();
const router = useRouter();
// const v=await loadInfoById();
// console.log(v.value.name);


const personalInfo: Ref<PersonalInfo> = ref<PersonalInfo>({
        id: 1,
        name: '',
        surname: '',
        birthday: new Date(),
      })


const submitForm = () => {
    const date: Date = new Date(personalInfo.value.birthday);
    personalInfo.value.birthday = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    updatePersonalInfo({ ...personalInfo.value });
    router.push({ name: 'PersonalInfo' });
};
</script>
<style scoped >
  .popup{
    color: crimson;
    font-size: 12px !important;
  }
</style>