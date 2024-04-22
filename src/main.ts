import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import routes from './router/route.ts';
import 'vant/es/toast/style'

const app = createApp(App);


app.use(routes);

app.mount('#app');

