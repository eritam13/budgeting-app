<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px"> 
          <button id="record-button"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="getReport()"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Get Report
          </button>
        </div>
      <h2>Money Spent: {{totalSpent}}$</h2>
      <div v-if="reportCheck==false" >
        <li v-for="r in report" :key="report.category">
          <span v-if="r.category=='FoodDrinks'">
            Food & Drinks - {{r.amount}}$ 
          </span>
          <span v-else>
            {{r.category}} - {{r.amount}}$
          </span>
          <dd></dd>
          <span v-for="rp in records" :key="records.category">
              <div v-if="rp.category==r.category">
                <div>
                          {{rp.activity}} {{rp.description}}{{rp.amount}} {{rp.currency}}    
                </div>        
              </div>
          </span>
          <dd></dd>
        </li>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRecordsStore} from '@/stores/recordsStore'
import { storeToRefs } from 'pinia';
import { ref, Ref } from 'vue';
import { onMounted } from 'vue';
const recordsStore = useRecordsStore();
const {records} = storeToRefs(recordsStore);
const {report} = storeToRefs(recordsStore);
let reportCheck:Ref<boolean> = ref(true);
let totalSpent:Ref<number> = ref(0);
const getReport = async () => {
    var combine = async() => {
    let result = await recordsStore.combineRecords();
    return result;
    }
    if(reportCheck.value==true)
    {
    totalSpent.value += await combine();
    }
    reportCheck.value = false;
};
onMounted(() => {
  recordsStore.loadReport();
  recordsStore.load();
});
</script>