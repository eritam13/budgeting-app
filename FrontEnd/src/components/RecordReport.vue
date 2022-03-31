<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <label for="from">FROM---</label>
      <input type="date" id="date" name="date" v-model="fromDate" />
      <div></div>
      <label for="date">TO---</label>
      <input type="date" id="date" name="date" v-model="toDate" />
      <div></div> 
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
      <h2>Total: {{totalSpent}}$</h2>
      <div v-if="reportCheck==false" >
        <li v-for="r in report" :key="r.category">
          <span v-if="r.category=='FoodDrinks'">
            Food & Drinks - {{r.amount}}$ 
          </span>
          <span v-else>
            {{r.category}} - {{r.amount}}$
          </span>
          <dd></dd>
          <span v-for="rp in records" :key="r.category">
              <div v-if="rp.category==r.category">
                <div>
                         Activity: {{rp.activity}} | Description: {{rp.description}} | Amount: {{rp.amount}} | Date: {{rp.date}} 
                </div>        
              </div>
          </span>
          <dd></dd>
        </li>
        <div v-if="records.length>0">
          <pie-chart :data="finalArr"></pie-chart>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRecordsStore} from '@/stores/recordsStore'
import {useReportStore} from '@/stores/reportStore'
import { storeToRefs } from 'pinia';
import { ref, Ref } from 'vue';
import { onMounted } from 'vue';

const recordsStore = useRecordsStore();
const reportStore = useReportStore();
const {records} = storeToRefs(recordsStore);
const {report} = storeToRefs(reportStore);
let fromDate:Ref<Date> =ref(new Date(-8640000000000000));
let toDate:Ref<Date> =ref(new Date(8640000000000000)); 
let finalArr:Ref<(string| number)[][]>=ref([]);
let reportCheck:Ref<boolean> = ref(true);
let totalSpent:Ref<number> = ref(0);
const getReport = async () => {
    totalSpent.value = 0;
    var combine = async() => {
    let result = await recordsStore.combineRecords(fromDate.value,toDate.value);
    return result;
    }
    if(reportCheck.value = true)
    {
      totalSpent.value += await combine();
    }
    getPieChartData();
    reportCheck.value = false;
};

const getPieChartData = async () => {
  let finalArray : (string | number)[][]=[];
   for (let i = 0; i < report.value.length; i++) {
    let c :string = report.value[i].category;
    let a :number = report.value[i].amount;
    if(a!=0 && c!="Income")
    {
      let smallArray: (string|number)[]=[c,a];
      finalArray.push(smallArray);
    }
   }
   finalArr.value=finalArray;
};
onMounted(() => {
  reportStore.loadReport();
  recordsStore.load();
});
</script>