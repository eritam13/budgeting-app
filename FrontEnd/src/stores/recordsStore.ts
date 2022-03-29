import useApi, {useApiRawRequest} from '@/modules/api';
import { Record } from '@/modules/record';
import { json } from 'node:stream/consumers';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Report } from '@/modules/report'
export const useRecordsStore = defineStore('recordsStore', () => {
  let apiGetRecords = useApi<Record[]>('records');
  const apiGetReport = useApi<Record[]>('records/report');
  let records = ref<Record[]>([]);
  let report = ref<Report[]>([]);
  const loadRecords = async () => {
    await apiGetRecords.request();
    if (apiGetRecords.response.value) {
      apiGetRecords.response.value.forEach(record =>{
        const date:Date = new Date(record.date);
        record.date= new Date(date.getFullYear(),date.getMonth(),date.getDate());
      });
      return apiGetRecords.response.value!;
    }
    return [];
  };

  const load = async () => {
    records.value = await loadRecords();
    records.value.forEach(function(value:any) {
      console.log(value);
    });
  };
  const loadR = async () => {
    await apiGetReport.request();
    if (apiGetReport.response.value)
    {
      return apiGetReport.response.value;
    }
    return [];
  };
  const loadReport = async () => {
    report.value = await loadR();
    report.value.forEach(function(value:any){
      console.log(value);
    });
  }
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
  const deleteRecords = async () =>{
    const apiDeleteRecords = useApiRawRequest('records',{
      method: 'DELETE',
    });
    const res = await apiDeleteRecords();
    apiGetRecords = useApi<Record[]>('records');
    records.value = await loadRecords();
  };
  const combineRecords = async():Promise<number>=>{
     records.value= await loadRecords();
     let total:number=0;
     if(records.value)
     {
              records.value.forEach(record =>{
              if(record.currency.toString() === 'EUR')
              {
                if(record.category.toString()=="Income")
                {
                  total+=record.amount*1.1;
                }
                else{
                  total-=record.amount*1.1;
                }
              }
              else 
              {
                if(record.category.toString()=="Income")
                {
                  total+=record.amount;
                }
                else{
                  total-=record.amount;
                }
              };    
    })
    return Math.round(total*100)/100;
    }
    return Math.round(total*100)/100;
  };

  return { records,report, load, addRecord, combineRecords, loadReport, deleteRecords }; 
});