import useApi, {useApiRawRequest} from '@/modules/api';
import { PersonalInfo } from '@/modules/personalinfo';
import { json } from 'node:stream/consumers';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Report } from '@/modules/report'
export const usePersonalInfoStore = defineStore('personalInfoStore', () => {
  let apiGetPersonalInfo = useApi<PersonalInfo[]>('personalinfo');
  
  let personalInfo = ref<PersonalInfo[]>([]);
  const loadPersonalInfo = async () => {
    await apiGetPersonalInfo.request();
    if (apiGetPersonalInfo.response.value) {
        apiGetPersonalInfo.response.value.forEach(PersonalInfo =>{
      });
      return apiGetPersonalInfo.response.value!;
    }
    return [];
  };

  const load = async () => {
    personalInfo.value = await loadPersonalInfo();
  };

  const updatePersonalInfo = async (personalInfo1: PersonalInfo) => {
    const apiAddPersonalInfo = useApi<PersonalInfo>('personalinfo', {
      method: 'UPDATE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personalInfo1),
    });
    await apiAddPersonalInfo.request();
    if (apiAddPersonalInfo.response.value) {
        personalInfo.value.push(apiAddPersonalInfo.response.value!);
    }
  }

 
  const addPersonalInfo = async (personalInfo1: PersonalInfo) => {
    const apiAddPersonalInfo = useApi<PersonalInfo>('personalinfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personalInfo1),
    });
    await apiAddPersonalInfo.request();
    if (apiAddPersonalInfo.response.value) {
        personalInfo.value.push(apiAddPersonalInfo.response.value!);
    }
  }
  return {personalInfo, load};
});