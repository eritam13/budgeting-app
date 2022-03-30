import useApi, {useApiRawRequest} from '@/modules/api';
import { Record } from '@/modules/record';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Report } from '@/modules/report'

export const useReportStore = defineStore('reportStore', () => {
let report = ref<Report[]>([]);
const apiGetReport = useApi<Record[]>('records/report');
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
    });
  }
  return { report, loadReport, loadR }; 
});