<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="id">Id</label>
            <input
              id="id"
              name="id"
              v-model="record.id"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Id"
            />
          </div>  
          <div>
            <label for="activity">Activity</label>
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
            <input
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
            <input type="date"  id="date"  name="date" v-model="record.date">
          </div>
          <div>
            <label for="currency">Currency</label>
            <dd></dd>
            <select name="currency" id="currency" v-model="record.currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
        <div>
            <label for="amount">Amount</label>
            <input
              id="amount"
              name="amount"
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
            Add Record
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Record } from '@/modules/Record';
import useRecord from "@/stores/recordsStore";
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
const record: Ref<Record> = ref({ id: 0,activity:'',description:'',date: new Date(),currency: '', amount: 0});
const { load, addRecord } = useRecord();
const router = useRouter();
onMounted(() => load());
const submitForm = () => {
  addRecord({ ...record.value });
  record.value.id=0;
  record.value.activity = '';
  record.value.description = '';
  record.value.date = new Date();
  record.value.currency = '';
  record.value.amount=0;
};
</script>