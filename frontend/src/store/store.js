import axios from "axios";
import { createStore } from "vuex";
let URL = "https://2762wbpq92.execute-api.us-west-2.amazonaws.com/poc/";

const store = createStore({
  state() {
    return {
      count: 0,
      body: {},
      params: {},
      phoneNumberList: [],
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
    },
    setPhoneNumebrList(state, payload) {
      state.phoneNumberList = payload;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    decrement(context) {
      context.commit("decrement");
    },
    async fetchDataAction(context, payload) {
      const url = `https://ibs44jxyzz3ky6grrfeerdloo40xnykn.lambda-url.ap-southeast-1.on.aws/?params3=params3&params4=params4`;
      const response = await axios.post(url, payload.body);
      context.commit("setResponseData", response.data);
      return response.data;
    },
    async availablePhoneNumberAction(context, payload) {
      try {
        const endpoint = `${URL}phone-number/available-phone-no?countryCode=${payload.countryCode}&type=${payload.type}&InstanceId=${payload.InstanceId}`;
        const response = await axios.get(endpoint);
        context.commit(
          "setPhoneNumebrList",
          response.data.AvailableNumbersList
        );
        return response.data;
      } catch (error) {
        console.log("Error::::: ", error);
        throw error;
      }
    },
    async replicateInstance(context, payload) {
      try {
        const endpoint = `${URL}poc`;
        const response = await axios.post(endpoint, payload);
        return response;
      } catch (error) {
        console.log("Error::::: ", error);
        throw error;
      }
    },
    async createTrafficDistributionGroup(context, payload) {
      try {
        const endpoint = `${URL}poc/${payload.InstanceId}`;
        const response = await axios.post(endpoint, payload);
        return response;
      } catch (error) {
        console.log("Error::::: ", error);
        throw error;
      }
    },
    async claimPhoneNumber(context, payload) {
      try {
        const endpoint = `${URL}phone-number/claim-phone-number`;
        const response = await axios.post(endpoint, payload);
        return response;
      } catch (error) {
        console.log("Error::::: ", error);
        throw error;
      }
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
  },
});

export default store;
