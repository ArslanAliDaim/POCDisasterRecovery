<template>
  <div id="app">
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "./components/common/header.vue";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { mapActions } from 'vuex';

const firebaseConfig = {
  apiKey: "AIzaSyCCCwnuMCMNCQwksaEDRj5XwypwtqoiiKo",
  authDomain: "hello-notification-a9d9e.firebaseapp.com",
  projectId: "hello-notification-a9d9e",
  storageBucket: "hello-notification-a9d9e.appspot.com",
  messagingSenderId: "522548358585",
  appId: "1:522548358585:web:9d17aeba9b141dfe4cda68",
  measurementId: "G-SC38JJZM2Y"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);

});

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  data() {
    return {
      
    }
  }, 
  methods: {
    ...mapActions(['registerDeviceForPushNotification']),
    async registerDevice(deviceToken) {
      try {
        const payload = {
          deviceToken
        };
        const response = await this.registerDeviceForPushNotification(payload);
        console.log("Response:::: ", response);
      } catch (error) {
        console.error("Error::: ", error)
      }
    }
  },
  created() {
    const self = this; // Store the Vue instance reference
    getToken(messaging, { vapidKey: 'BM6w8vpzFkjZdGTRLrjJt_OmiPQ6ZuQ9uEUNKHNiystWPUQr0VHyXkaLilvXl_-VBIgMCv_6QX_qOzWYgx6EqEg' }).then((currentToken) => {
      if (currentToken) {
        console.log("Device token:: ", currentToken);
        self.registerDevice(currentToken); // Use the stored reference to call the method
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
