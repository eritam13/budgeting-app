import useApi, {useApiRawRequest} from '@/modules/api';
import { Record } from '@/modules/record';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import {Ref} from 'vue';
export const useRecordsStore = defineStore('recordsStore', () => {
  let apiGetRecords = useApi<Record[]>('records');
  let records = ref<Record[]>([]);
  let selectedRecord:Ref<Record> = ref<Record>({
        id:'',
        activity: '',
        description: '',
        date: new Date(),
        currency: '',
        amount: 0,
        category: ''
  }
  );
  let allRecords:Record[]=[];
  let url=ref<String>();
  url.value='1';
  const updateUrl=async (newurl:String) =>{
    url.value=newurl;
  };
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
    });
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

  const updateRecord = async (record1: Record) => {
    const apiUpdateRecord = useApi<Record>(`records/${record1.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record1),
    });
    await apiUpdateRecord.request();
    if (apiUpdateRecord.response.value) {
      allRecords.push(apiUpdateRecord.response.value);
      records.value=allRecords;
    }
  }

  const deleteRecord = async (record : Record) =>{
    const apiDeleteRecord = useApiRawRequest(`records/${record.id}`,{
      method: 'DELETE',
    });
    const res = await apiDeleteRecord();

    if (res.status === 204) {
      let id = allRecords.indexOf(record);

      if (id !== -1) {
        allRecords.splice(id, 1);
      }

      id = allRecords.indexOf(record);

      if (id !== -1) {
        allRecords.splice(id, 1);
      }

      records.value = allRecords;
    }
    load();
  };
  const loadInfoById = async (id : String) => {
      records.value= await loadRecords();
      let req:Record={
        id:'',
        activity: '',
        description: '',
        date: new Date(),
        currency: '',
        amount: 0,
        category: '',
      };
      records.value!.forEach(function(r){
        if(r.id==id)
        {
            req.id= r!.id,
            req.activity= r!.activity,
            req.date=r!.date,
            req.description= r!.description,
            req.currency= r!.currency,
            req.amount= r!.amount,
            req.category= r!.category
        }
      });
      selectedRecord.value= req;
  };

  const deleteRecords = async () =>{
    const apiDeleteRecords = useApiRawRequest('records',{
      method: 'DELETE',
    });
    const res = await apiDeleteRecords();
    apiGetRecords = useApi<Record[]>('records');
    records.value = await loadRecords();
  };


  const combineRecords = async(from:Date,to:Date):Promise<number>=>{
     records.value= await loadRecords();
     let total:number=0;
     if(records.value)
     {
              records.value.forEach(record =>{
              console.log(record.date>=from);
              console.log(record.date<=to);
              if(record.date>=from && record.date<=to)  
              {
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
              }  
    })
    return Math.round(total*100)/100;
    }
    return Math.round(total*100)/100;
  };

  return { records,selectedRecord, load, addRecord, combineRecords, deleteRecords, deleteRecord, updateRecord, updateUrl,loadInfoById }; 
});