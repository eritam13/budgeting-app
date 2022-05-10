import useApi from '@/modules/api';
import { AuthResponse, User } from '@/modules/user';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('userStore', () => {
  let user = ref<User | undefined>(undefined);
  let token = ref<string | undefined>(undefined);
  const isAuthenticated = computed(() => Boolean(token.value));

  const login = async (loginUser: User): Promise<boolean> => {
    const apiLogin = useApi<AuthResponse>('users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    });

    await apiLogin.request();

    if (apiLogin.response.value && apiLogin.response.value.token) {
      token.value = apiLogin.response.value.token;
      user.value = loginUser;

      return true;
    }

    return false;
  };
  const register = async (registerUser:User): Promise<boolean>=>{
    const apiRegister = useApi<AuthResponse>('users/register', {
      method: 'POST',
      headers:{ 
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerUser),
    });
    await apiRegister.request();

    if(apiRegister.response.value && apiRegister.response.value.token)
    {
      token.value = apiRegister.response.value.token;
      user.value = registerUser;
      console.log(apiRegister.response.value.token)
      return true;
    }
    return false;
  };
  const logout = () => {
    user.value = undefined;
    token.value = undefined;
  };

  return {
    register,
    user,
    isAuthenticated,
    token,
    login,
    logout,
  };
});
