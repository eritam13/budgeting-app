<template>
   <div class="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center bg-gray-50">
      <h1 class="font-bold">{{ title }}</h1>
      <ul>
        <div v-if="records.length === 0">
            Empty
        </div>
        <div v-else>
        <DataTable :value="records">
        <Column field="id" header="ID" />
        <Column field="activity" header="Activity" />
        <Column field="description" header="Description" />
        <Column field="date" header="Date" />
        <Column field="currency" header="Currency"/>
        <Column field="amount" header="Amount"/>
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

defineProps<{ title: string }>();

const recordsStore = useRecordsStore();
const { records } = storeToRefs(recordsStore);

onMounted(() => {
  recordsStore.load();
});

</script>
