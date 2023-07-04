import { ref } from 'vue';
import { defineStore } from 'pinia';
import decode from "jwt-decode"
import router from '../router/index';
import { apiAxios } from '@/utils/axios';


export const useAuthStore = defineStore('auth', () => {
    // variables to be on front
    const token = ref('')
    const userid = ref('')

    async function login(email: string, password: string) {
        const response = await apiAxios.post('/Auth/login', {
            email,
            password
        })
        localStorage.setItem('token', JSON.stringify(response.data.data.token))
        token.value = response.data.data.token;
        localStorage.setItem('user', JSON.stringify(response.data.user))
        userid.value = response.data.user;
        if (response) {
            router.push('/')
        }
        return {token: token.value, userId: userid.value}
    }

    async function signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login')
    }

      function isExpired() {
        const token = localStorage.getItem("token");
      
        if (!token) {
          return true; // Não há token presente, considerar como expirado
        }
      
        try {
          const decodedToken: any = decode(token);
      
          if (Date.now() >= decodedToken.exp * 1000) {
            return true; // Token expirado
          }
      
          return false; // Token válido
        } catch (error) {
          return true; // Erro ao decodificar o token, considerar como expirado
        }
      }

    function isLogged() {
        return window.localStorage.getItem("token");
    }

    return {
        token,
        userid,
        signOut,
        login,
        isLogged,
        isExpired
    }
})