<template>
   <div class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center bg-gray-50">

      <h1 class="font-bold">{{ title }}</h1>
      <ul>
        <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="clearRecords"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Clear Records
          </button>
        <div v-if="records.length === 0">
            Empty
        </div>
        <div v-else>
        <DataTable :value="records">
          <Column field="activity" header="Activity" />
          <Column field="description" header="Description" />
          <Column field="date" header="Date" />
          <Column field="currency" header="Currency"/>
          <Column field="amount" header="Amount"/>
          <Column field="category" header="Category"/>
          <Column>
          <template #body="{ data }">
            <button
              class="border bg-yellow-400 text-red-900 py-0 px-2 border-red-900 font-bold"
              @click="edit(data)"
            >
              EDIT
            </button>
          </template>
        </Column>
        <Column>
          <template #body="{ data }">
            <button
              class="border bg-red-400 text-red-900 py-0 px-2 border-red-900 font-bold"
              @click="remove(data)"
            >
              X
            </button>
          </template>
        </Column>
        </DataTable>

        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRecordsStore} from '@/stores/recordsStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { Record } from '@/modules/record'
import { useRouter } from 'vue-router';
import EditRecordVue from '@/components/EditRecord.vue';

defineProps<{ title: string }>();
const recordsStore = useRecordsStore();
const { records } = storeToRefs(recordsStore);
const {deleteRecords, updateUrl } = useRecordsStore();
const router = useRouter();
const clearRecords = ()=>{
  deleteRecords();
};


onMounted(() => {
  recordsStore.load();
});


const edit=(record: Record) => {
  router.addRoute({path:'/records/'+record.id,name:'EditPersonalInfo',component:EditRecordVue});
  updateUrl(record.id!);
  router.push({path:'/records/'+record.id,name:'EditPersonalInfo'});
};


const remove = (record: Record) => {
  recordsStore.deleteRecord(record);
  
};
</script>
