
<template>
<body >
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <h1 class="font-bold">EDIT</h1>
          <div>
            <label for="activity">Activity</label>
            <span class="popup" v-if="!activityCheck">      (This field is required)</span>
            <input
              id="activity"
              name="activity"
              v-model="record.activity"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Activity"
            />
          </div>
          <div>
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              v-model="record.description"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Description"
            />
          </div>
          <div>
            <label for="date">Date</label>
            <dd></dd>
            <input type="date"  id="date" name="date" v-model="record.date" />
            <input type="time" id="time" name="time" v-model="record.time"/>
            <dd></dd>
            <dd></dd>
            <label for="currency">Currency</label>
            <span class="popup" v-if="!currencyCheck">      (Please select a currency)</span>
            <dd></dd>
            <select name="currency" id="currency" v-model="record.currency">
              <option value="USD" label="&#128181 USD">USD</option>
              <option value="EUR" label="&#128182 EUR">EUR</option>
              <option value="" selected disabled hidden>Choose Currency</option>
            </select>
            <dd></dd>
            <dd></dd>
            <label for="category">Category</label>
            <span class="popup" v-if="!categoryCheck">      (Please select a category)</span>
            <dd></dd>
            <select category="category" id="category" v-model="record.category">
              <option value="FoodDrinks" label="&#127790 Food & Drinks"></option>
              <option value="Shopping" label="&#128722 Shopping"></option>
              <option value="Housing" label="&#128146 Housing"></option>
              <option value="Transportation" label="&#128652 Transportation"></option>
              <option value="Income" label="&#128176 Income"></option>
              <option value="Investments" label="&#128200 Investments"></option>
              <option value="Entertainment" label="&#129336 Entertainment"></option>
              <option value="Other" label="Other"></option>
              <option value="" selected disabled hidden>Choose Category</option>
            </select>
          </div>
        </div>
        <div>
          <label for="amount">Amount</label>
          <span class="popup" v-if="!amountCheck">      (This field is required)</span>
          <input
            id="amount"
            name="amount"
            type="number"
            v-model="record.amount"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Amount"
          />
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
  </body>
</template>

<script setup lang="ts">


import { Record } from '@/modules/record';
import { useRecordsStore } from '@/stores/recordsStore';
import { onMounted, onUpdated, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from '@/stores/authStore'
import { storeToRefs } from 'pinia';
const {user} = storeToRefs(useAuthStore());
const router = useRouter();
const {updateRecord } = useRecordsStore();
const {selectedRecord} = useRecordsStore();
let c=new URL(location.href).pathname.toString().slice(9);

const record: Ref<Record> = ref({
    id:selectedRecord.id,
    activity: selectedRecord.activity,
    description: selectedRecord.description,
    date: selectedRecord.date,
    time: selectedRecord.time,
    currency: selectedRecord.currency,
    amount: selectedRecord.amount,
    category: selectedRecord.category,
    user:user.value?.username
}); 


onMounted (()=>{
  var d=(<HTMLInputElement>document.getElementById("date"));
  d.valueAsDate=selectedRecord.date;
});
onUpdated(()=>{
  var d=(<HTMLInputElement>document.getElementById("date"));
  if(d.valueAsDate==null)
  {
  d.valueAsDate=selectedRecord.date;
  }
});



let activityCheck:Ref<boolean>=ref(true);
let currencyCheck:Ref<boolean>=ref(true);
let categoryCheck:Ref<boolean>=ref(true);
let amountCheck:Ref<boolean>=ref(true);
const submitForm = async () => {
  amountCheck.value =record.value.amount!=0;
  categoryCheck.value=record.value.category!=""; 
  currencyCheck.value=record.value.currency!="";
  activityCheck.value=record.value.activity!="";
  if(amountCheck.value==true && currencyCheck.value==true && categoryCheck.value==true && activityCheck.value==true) {
    record.value.id=c;
    const date: Date = new Date(record.value.date);
    record.value.date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    updateRecord({...record.value});
    router.push({ name: 'RecordList' });
  }
};


</script>
<style scoped >
  .popup{
    color: crimson;
    font-size: 12px !important;
  }
</style>
