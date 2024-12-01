import "./assets/main.css"
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router'
import axios from "axios";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

axios.defaults.baseURL = "http://localhost:8080/";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App)


app.use(pinia)
app.use(router)
app.mount('#app')