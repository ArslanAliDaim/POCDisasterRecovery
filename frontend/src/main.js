import { createApp } from 'vue'; // import createApp from Vue 3
import App from './App.vue';
import router from './router';
import store from './store/store';

// Create the Vue app instance
const app = createApp(App);

// Use the router
app.use(router);
app.use(store);

// Mount the app to the DOM
app.mount('#app');