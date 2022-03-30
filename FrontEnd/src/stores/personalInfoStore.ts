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
  let url=ref<String>();
  url.value='1';
  const updateUrl=async (newurl:String) =>{
    url.value=newurl;
  };
  const loadPersonalInfo = async () => {
    await apiGetPersonalInfo.request();
    if (apiGetPersonalInfo.response.value) {
        apiGetPersonalInfo.response.value.forEach(PersonalInfo =>{
      });
      return apiGetPersonalInfo.response.value!;
    }
    return [];
  };


  const loadInfoById = async () :Promise<Ref<PersonalInfo>> => {
    await apiGetPersonalInfo.request();
      let c=apiGetPersonalInfo.response.value!.at(parseInt(url.value!.toString())-1);
      let personalInfo1:Ref<PersonalInfo>= ref<PersonalInfo>({
        id: c!.id,
        name: c!.name,
        surname:c!.surname,
        birthday: c!.birthday
        
      })
      personalInfo.value
      //console.log(apiGetPersonalInfo.response.value.at(parseInt(url.value!.toString())-1));
      return personalInfo1;
  };


  const load = async () => {
    personalInfo.value = await loadPersonalInfo();
  };

  const updatePersonalInfo = async (personalInfo1: PersonalInfo) => {console.log(url.value)
    const apiAddPersonalInfo = useApi<PersonalInfo>('personalinfo/'+url.value, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personalInfo1),
    });
    
    await apiAddPersonalInfo.request();
    if (apiAddPersonalInfo.response.value) {
      allInfo.push(apiAddPersonalInfo.response.value);
      personalInfo.value=allInfo;
    }
  }

  return {personalInfo, load, updatePersonalInfo, updateUrl, loadInfoById};
});