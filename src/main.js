import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css ';
import 'primevue/resources/primevue.min.css ';
import 'primeicons/primeicons.css';
import 'vue-cal/dist/vuecal.css'
import './index.css';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';


import router from "./router/index.js";
//axios.defaults.baseURL = 'https://home-tasks-2.herokuapp.com'
axios.defaults.baseURL = 'https://git.heroku.com/home-tasks-2.git'


const app = createApp(App);

app.use(router).use(PrimeVue).use(ToastService);
app.directive('tooltip', Tooltip);

app.mount('#app')
