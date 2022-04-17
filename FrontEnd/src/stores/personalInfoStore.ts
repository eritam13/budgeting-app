import useApi, {useApiRawRequest} from '@/modules/api';
import { PersonalInfo } from '@/modules/personalinfo';
import { json } from 'node:stream/consumers';
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Report } from '@/modules/report'
import { ok } from 'assert';
export const usePersonalInfoStore = defineStore('personalInfoStore', () => {
  let apiGetPersonalInfo = useApi<PersonalInfo[]>('personalinfo');
  let allInfo:PersonalInfo[]=[];
  let personalInfo = ref<PersonalInfo[]>([]);
  let selectedPersonalInfo:Ref<PersonalInfo> = ref<PersonalInfo>({
    id:0,
    name: '',
    surname: '',
    birthday: new Date()
}
);
  const loadPersonalInfo = async () => {
    await apiGetPersonalInfo.request();
    if (apiGetPersonalInfo.response.value) {
        apiGetPersonalInfo.response.value.forEach(PersonalInfo =>{
      });
      return apiGetPersonalInfo.response.value!;
    }
    return [];
  };


  const loadInfoById = (id:number) => {
      load();
      let pi:PersonalInfo={
        id:0,
        name: '',
        surname: '',
        birthday: new Date()
      };
      personalInfo.value!.forEach(function(p){
        if(p.id==id)
        {
          pi.id= p!.id,
          pi.name= p!.name,
          pi.surname= p!.surname,
          pi.birthday=p!.birthday
        }
      });
      selectedPersonalInfo.value= pi;
  };


  const load = async () => {
    personalInfo.value = await loadPersonalInfo();
    personalInfo.value.forEach(function(value:any) {
    });
  };

  const updatePersonalInfo = async (personalInfo1: PersonalInfo) => {
    const apiUpdatePersonalInfo = useApi<PersonalInfo>(`personalinfo/${personalInfo1.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personalInfo1),
    });
    
    await apiUpdatePersonalInfo.request();
    if (apiUpdatePersonalInfo.response.value) {
      allInfo.push(apiUpdatePersonalInfo.response.value);
      personalInfo.value=allInfo;
      load();
    }
    
  }

  return {personalInfo,selectedPersonalInfo, load, updatePersonalInfo, loadInfoById};
});