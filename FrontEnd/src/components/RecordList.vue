<template>
   <div class="bg-white py-12 px-4 sm:px-6 lg:px-8" style="margin-left: 10%; width: auto; background-color:rgb(230, 230, 245);">
    <div class="text-center">

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
        <DataTable :value="records" :paginator="true"  showGridlines :rows="5"   v-model:filters="filters2" dataKey="id"
        filterDisplay="row"  responsiveLayout="scroll"
                :globalFilterFields="['activity','category']">
        
          <Column field="activity"  header="Activity" :sortable="true" style="min-width:12rem">
          </Column>
          <Column field="description" header="Description" :sortable="true">
          </Column>
          <Column field="date" header="Date" :sortable="true">
          <template #body="{ data }">
            {{ data.date.toString().split("00:00:00")[0]}}
          </template>
          </Column>
          <Column field="time" header="Time" />
          <Column field="currency" header="Currency" :sortable="true"/>
          <Column field="amount" header="Amount" :sortable="true"/>
          <Column field="category" header="Category" :sortable="true" :showFilterMenu="false" style="min-width:12rem">
          <template #body="{data}">
              <span :class="'customer-badge category-' + data.category">{{data.category}}</span>
          </template>
          <template #filter="{filterModel,filterCallback}">
              <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="categoriesss" placeholder="Any"
               class="p-column-filter" :showClear="true"  >
                  <template #value="slotProps">
                      <span :class="'customer-badge category-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                      <span v-else>{{slotProps.placeholder}}</span>
                  </template>
                  <template #option="slotProps">
                      <span :class="'customer-badge category-' + slotProps.option">{{slotProps.option}}</span>
                  </template>
              </Dropdown>
          </template>
          </Column>
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
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import { Record } from '@/modules/record'

import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useRouter } from 'vue-router';
import EditRecordVue from '@/components/EditRecord.vue';
defineProps<{ title: string }>();


const recordsStore = useRecordsStore();
const { records } = storeToRefs(recordsStore);
const {deleteRecords,loadInfoById } = useRecordsStore();
const router = useRouter();



const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.EQUALS },
      })
const categories =ref( [
  {name:'Food & Drink', code: 'FoodDrink'},
  {name:'Shopping', code: 'Shopping'},
  {name:'Housing', code: 'Housing'},
  {name:'Transportation', code: 'Transportation'},
  {name:'Income', code: 'Income'},
  {name:'Investments', code: 'Investments'},
  {name:'Entertainment', code: 'Entertainment'},
  {name:'Other', code: 'Other'}
  ])

const filters2=ref({'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
              'activity': {value: null, matchMode: FilterMatchMode.CONTAINS},
              'category':{value: null, matchMode: FilterMatchMode.EQUALS}});
const categoriesss =ref(['FoodDrinks','Shopping','Housing','Transportation','Income','Investments','Entertainment','Other']);

const categoriess = ['FoodDrinks','Shopping','Housing','Transportation','Income','Investments','Entertainment','Other'];

const clearRecords = ()=>{
  deleteRecords();
}


onMounted(() => {
  recordsStore.load();

});

const edit=(record: Record) => {
  loadInfoById(record.id!)
  router.addRoute({path:'/records/'+record.id,name:'EditRecord',component:EditRecordVue});
  router.push({path:'/records/'+record.id,name:'EditRecord'});
};

const remove = (record: Record) => {
  recordsStore.deleteRecord(record);
  
};
</script>
