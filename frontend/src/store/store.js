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
      trafficDistributionGroup: [],
      isAuthenticated: true,
    };
  },
  mutations: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setResponseData(state, payload) {
      state.body = payload.body;
      state.params = payload.params;
    },
    setPhoneNumebrList(state, payload) {
      state.phoneNumberList = payload;
    },
    setTrafficDistribitionGroups(state, payload) {
      state.trafficDistributionGroup = payload;
    },
  },
  actions: {
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
        // const endpoint = `${URL}poc`;
        const endpoint = `${URL}disaster`;
        const response = await axios.post(endpoint, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.log("Error::::: ", error);
        throw error;
      }
    },
    async createTrafficDistributionGroup(context, payload) {
      try {
        const endpoint = `${URL}poc/${payload.InstanceId}`;
        const response = await axios.post(endpoint, payload);
        console.log("AASSSS", response);
        return response.data;
      } catch (error) {
        console.log("Error::::: ", error);
        throw error;
      }
    },
    async listTrafficDistributionGroup(context, payload) {
      try {
        const endpoint = `${URL}poc/${payload.InstanceId}`;
        const response = await axios.get(endpoint);
        return response.data;
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
    login({ commit }) {
      // Simulate login process
      commit("login");
    },
    logout({ commit }) {
      // Simulate logout process
      commit("logout");
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
    getListTrafficDistributionGroups(state) {
      return state.trafficDistributionGroup;
    },
    isAuthenticated: (state) => state.isAuthenticated,
  },
});

export default store;
