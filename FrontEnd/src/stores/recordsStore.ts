import useApi from '@/modules/api';
import { Record } from '@/modules/Record';
import { json } from 'node:stream/consumers';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRecordsStore = defineStore('recordsStore', () => {
  const apiGetRecords = useApi<Record[]>('records');
  let records = ref<Record[]>([]);

  const loadRecords = async () => {
    await apiGetRecords.request();
    if (apiGetRecords.response.value) {
      apiGetRecords.response.value.forEach(record =>{
        const date:Date = new Date(record.date);
        record.date= new Date(date.getFullYear(),date.getMonth(),date.getDate());
        console.log(record);
      });
      return apiGetRecords.response.value!;
    }
    return [];
  };

  const load = async () => {
    records.value = await loadRecords();
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
  //const deleteRecords = async () =>{
  //  const apiDeleteRecords = useApi<Record>('records',{
  //    method: 'DELETE',
  //  })
  //  const};
  const combineRecords = async():Promise<number>=>{
     records.value= await loadRecords();
     let total:number=0;
     if(records.value)
     {
              records.value.forEach(record =>{
              if(record.currency.toString() === 'EUR')
              {
                total+=record.amount*1.1;
              }
              else 
              {
                total+=record.amount
              };    
    })
    return total;
    }
    return total;
  };

  return { records, load, addRecord, combineRecords }; //add deleteRecords
});