import useApi from '@/modules/api';
import { Record } from '@/modules/record';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRecordsStore = defineStore('recordsStore', () => {
  const apiGetRecords = useApi<Record[]>('records');
  let records = ref<Record[]>([]);

  const loadRecords = async () => {
    await apiGetRecords.request();

    if (apiGetRecords.response.value) {
      return apiGetRecords.response.value!;
    }
    return [];
  };

  const load = async () => {
    records.value = await loadRecords();
    console.log(records.value);
  };

  const addRecord = async (record: Record) => {
    const apiAddRecord = useApi<Record>('records', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
    await apiAddRecord.request();
    if (apiAddRecord.response.value) {
      records.value.push(apiAddRecord.response.value!);

    }
  };

  return { records, load, addRecord };
});