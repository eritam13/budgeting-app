import useApi, {useApiRawRequest} from '@/modules/api';
import { Record } from '@/modules/record';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import {Ref} from 'vue';
import { useAuthStore } from './authStore';
export const useRecordsStore = defineStore('recordsStore', () => {
  const authStore = useAuthStore();

  let records = ref<Record[]>([]);
  let selectedRecord:Ref<Record> = ref<Record>({
        id:'',
        activity: '',
        description: '',
        date: new Date(),
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        currency: '',
        amount: 0,
        category: '',
        user: ''
  }
  );
  let allRecords:Record[]=[];
  const loadRecords = async (username:string|undefined) => {
    let apiGetRecords = useApi<Record[]>(`records?username=${username}`,{
      headers: { Authorization: 'Bearer ' + authStore.token },
    });
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
    records.value = await loadRecords(authStore.user?.username);
  };

  const addRecord = async (record: Record) => {
    const apiAddRecord = useApi<Record>('records', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + authStore.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
    await apiAddRecord.request();
    if (apiAddRecord.response.value) {
      records.value.push(apiAddRecord.response.value!);
    }
    await load();
  };

  const updateRecord = async (record1: Record) => {
    const apiUpdateRecord = useApi<Record>(`records/${record1.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + authStore.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record1),
    });
    await apiUpdateRecord.request();
    var c=apiUpdateRecord.response.value;
    if (c) {
      allRecords.push(c);
      records.value=allRecords;

    }
    await load();
  }

  const deleteRecord = async (record : Record) =>{
    const apiDeleteRecord = useApiRawRequest(`records/${record.id}`,{
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + authStore.token },
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
  const loadInfoById = (id : String) => {
      load();
      let req:Record={
        id:'',
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        activity: '',
        description: '',
        date: new Date(),
        currency: '',
        amount: 0,
        category: '',
        user:''
      };
      records.value!.forEach(function(r){
        if(r.id==id)
        {
            req.id= r!.id,
            req.activity= r!.activity,
            req.date=r!.date,
            req.time=r!.time,
            req.description= r!.description,
            req.currency= r!.currency,
            req.amount= r!.amount,
            req.category= r!.category
        }
      });
      selectedRecord.value= req;
  };

  const deleteRecords = async (username:string|undefined) =>{
    const apiDeleteRecords = useApiRawRequest(`records?username=${username}`,{
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + authStore.token }
    });
    const res = await apiDeleteRecords();
    let apiGetRecords = useApi<Record[]>('records',{
      headers: { Authorization: 'Bearer ' + authStore.token },
    });
    records.value = await loadRecords(authStore.user?.username);
  };


  const combineRecordsUSD = async(from:Date,to:Date):Promise<number>=>{
     const hours1 = from.getHours();
     const minutes1 = from.getMinutes();
     const hours2 = to.getHours();
     const minutes2 = to.getMinutes();
     records.value= await loadRecords(authStore.user?.username);
     let total:number=0;
     if(records.value)
     {
              from.setHours(hours1);
              from.setMinutes(minutes1);
              to.setHours(hours2);
              to.setMinutes(minutes2);
              records.value.forEach(record =>{
              const d = new Date(record.date.getFullYear(),record.date.getMonth(),record.date.getDate(),parseInt(record.time.split(":")[0]),parseInt(record.time.split(":")[1]))
              
              if(d>=from && d<=to)  
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
    });
        return Math.round((total+Number.EPSILON)*100)/100;
    }
    return Math.round(total*100)/100;
  };


  return { records,selectedRecord, load, addRecord, combineRecordsUSD, deleteRecords, deleteRecord, updateRecord,loadInfoById }; 
});