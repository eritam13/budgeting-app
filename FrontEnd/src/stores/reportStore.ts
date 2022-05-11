import useApi, { useApiRawRequest } from '@/modules/api';
import { Record } from '@/modules/record';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Report } from '@/modules/report';
import { useAuthStore } from './authStore';
let s =ref(<Date>new Date(1000,0,1,0,0));
let e = ref(<Date>new Date(9998,11,31,23,59));

export const useReportStore = defineStore(`reportStore`, () => {
  const authStore = useAuthStore();
  let apiGetReport=useApi<Record[]>('');
  let report = ref<Report[]>([]);
  const loadRep = async (username:string|undefined)=>{
    let dateS  = s.value.getFullYear().toString();
    let dateE  = e.value.getFullYear().toString();
    if(s.value.getMonth().toString().length<2 && s.value.getMonth()!=9)
    {
      dateS = dateS + `-0${s.value.getMonth()+1}`
    }
    if(e.value.getMonth().toString().length<2 && e.value.getMonth()!=9)
    {
      dateE = dateE + `-0${e.value.getMonth()+1}`
    }
    if(s.value.getMonth().toString().length==2 || s.value.getMonth()==9)
    {
      dateS = dateS + `-${s.value.getMonth()+1}`
    }
    if(e.value.getMonth().toString().length==2 || e.value.getMonth()==9)
    {
      dateE = dateE + `-${e.value.getMonth()+1}`
    }

            

    if(s.value.getDate().toString().length<2)
    {
      dateS = dateS + `-0${s.value.getDate()}`
    }
    if(e.value.getDate().toString().length<2)
    {
      dateE = dateE + `-0${e.value.getDate()}`
    }

    if(s.value.getDate().toString().length==2)
    {
      dateS = dateS + `-${s.value.getDate()}`
    }
    if(e.value.getDate().toString().length==2)
    {
      dateE = dateE + `-${e.value.getDate()}`
    }

    if(s.value.getHours().toString().length<2)
    {
      dateS = dateS + `T0${s.value.getHours()}`
    }
    if(e.value.getHours().toString().length<2)
    {
      dateE = dateE + `T0${e.value.getHours()}`
    }

    if(s.value.getHours().toString().length==2)
    {
      dateS = dateS + `T${s.value.getHours()}`
    }
    if(e.value.getHours().toString().length==2)
    {
      dateE = dateE + `T${e.value.getHours()}`
    }



    if(s.value.getMinutes().toString().length<2)
    {
      dateS = dateS + `:0${s.value.getMinutes()}Z`
    }
    if(e.value.getMinutes().toString().length<2)
    {
      dateE = dateE + `:0${e.value.getMinutes()}Z`
    }

    if(s.value.getMinutes().toString().length==2)
    {
      dateS = dateS + `:${s.value.getMinutes()}Z`
    }
    if(e.value.getMinutes().toString().length==2)
    {
      dateE = dateE + `:${e.value.getMinutes()}Z`
    }

    if(dateS==null||dateS==undefined||dateS=="NaN")
    {
      dateS=(new Date(1000,1,1,1,1).toDateString());
    }
    if(dateE==null||dateE==undefined||dateE=="NaN")
    {
      dateE=(new Date(3000,1,1,1,1).toDateString());
    }

    apiGetReport = useApi<Record[]>(
      `records/report?from=${dateS}&to=${dateE}&username=${username}`,{
        headers: { Authorization: 'Bearer ' + authStore.token }
      }
    );
  };

  const loadR = async () => {
    loadRep(authStore.user?.username);
    await apiGetReport.request();
    if (apiGetReport.response.value) {
      return apiGetReport.response.value;
    }
    return [];
  };
  const loadReport = async () => {
    report.value = await loadR();
    report.value.forEach(function (value: any) {});
  };
  return { report, loadReport, loadR, s, e };
});
