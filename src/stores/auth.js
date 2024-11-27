import { defineStore } from 'pinia';
import {useRouter} from "vue-router";
import axios from 'axios';
import {useQuasar} from "quasar";
const $q = useQuasar();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /** @type {{ user: {name: string, urlImage: string}, token: string }} */
    user:{
      name:"",
      urlImage:""
    },
    defaultLanguage: "it-IT",
    token: "",
  }),
  persist:true,
  getters:{
    isAuthenticated: (state) => {
      return state.token
    },
    getUser: (state) => {
      return state.user
    },
    getDefaultLanguage: (state) => {
      return state.defaultLanguage
    }
  },
  actions: {
    setLanguage: (state, language) => {
      state.defaultLanguage = language
    },
    async createUser(data) {
      this.user = data
      return

      try{
        const user =await axios(process.env.API_URL + '/auth/create', {data});
        if(user.status == 200){
          this.token = user.data.token;
          this.user = user.data.user;
          useRouter().push('/');
        }else{
          this.useError('Errore nella creazione dell\'utente')
        }
      }catch (e){
        this.useError(e);
      }

    },
    useError(message){
      $q.notify({icon: 'error', message: message});
    },
    setToken(token) {
      this.token = token;
    },
    async logout() {
      this.token = "";
      this.user = { name: "", urlImage: "" };
      await useRouter().push('/');
    },
    async verifyToken(token) {
      if(token.token){
        try {
          const response = await axios.post(process.env.API_URL + '/auth/verifyToken',{},{
            headers: {
              Authorization: `Bearer ${token.token}`
            }
          });
          if (response.status === 200) {
            this.setToken(response.data.token)
            return true;
          }else {
            this.setToken("")
            return false;
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  },
});
