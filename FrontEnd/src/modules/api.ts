import { ref, Ref } from 'vue';

export type ApiRequest = () => Promise<void>;

export interface UseableApi<T> {
  response: Ref<T | undefined>;
  request: ApiRequest;
}

let apiUrl = '';

export function setApiUrl(url: string) {
  apiUrl = url;
}

export default function useApi<T>(
  url: RequestInfo,
  options?: RequestInit,
): UseableApi<T> {
  const response: Ref<T | undefined> = ref();

  const request: ApiRequest = async () => {
    const res = await fetch(apiUrl + url, options);
    
    console.log(apiUrl)
    console.log(url)
    console.log(options)
    try
    {
       const data =  res.json();
       console.log(data)
       response.value = await data;
    }
    catch{
     
    }
  };

  return { response, request };
}



export function useApiRawRequest(url: RequestInfo, options?: RequestInit) {
  const request: () => Promise<Response> = async () => {
    return await fetch(apiUrl + url, options);
  };
  return request;
}

