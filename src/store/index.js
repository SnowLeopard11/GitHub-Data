import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import { getLanguage } from '@/lang'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language:getLanguage()
  },
  mutations: {
    SET_LANGUAGE:(state,language) =>{
      state.language = language;
      Cookies.set("language",language);
    }
  },
  actions: {
    setLanguage({commit},language){
      commit("SET_LANGUAGE",language);
    }
  }
});
