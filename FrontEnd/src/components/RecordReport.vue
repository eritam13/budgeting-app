<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px"> 
           <h2>Money Spent: {{totalSpent}}$</h2>
          <button id="record-button"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="getReport(this)"
          >

            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Get Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRecordsStore} from '@/stores/recordsStore'
import { ref, Ref } from 'vue';

const recordsStore = useRecordsStore();
let totalSpent:Ref<number> = ref(0);
const getReport = async (button:any) => {
    var something = async() => {
    let result = await recordsStore.combineRecords();
    console.log(result);
    return result;
    }
    totalSpent.value += await something();
    button.preventDefault();
    button.target.setAttribute("disabled", true);
};
const reportButton:any = document.getElementById("record-button");
reportButton?.addEventListener('click',()=>{
    reportButton.disabled =true;
});
</script>