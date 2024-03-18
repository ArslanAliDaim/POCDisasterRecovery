import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
    state() {
      return {
        count: 0,
        body: {},
        params: {}
      };
    },
    mutations: {
      increment(state) {
        state.count++;
      },
      decrement(state) {
        state.count--;
      },
      setResponseData(state, payload) {
        state.body = payload.body;
        state.params = payload.params;
      }
    },
    actions: {
      increment(context) {
        context.commit('increment');
      },
      decrement(context) {
        context.commit('decrement');
      },
      async fetchDataAction(context, payload) {
        const url = `https://ibs44jxyzz3ky6grrfeerdloo40xnykn.lambda-url.ap-southeast-1.on.aws/?params3=params3&params4=params4`
        const response = await axios.post(url, payload.body);
        context.commit("setResponseData", response.data);
        return response.data
      },
    },
    getters: {
      getCount(state) {
        return state.count;
      }
    }
  });
  
  export default store;