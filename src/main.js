import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import toastPlugin from './index';

const app = createApp(App);
app.use(toastPlugin);
app.mount('#app')
