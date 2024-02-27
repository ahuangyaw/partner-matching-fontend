import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { Button,NavBar,Icon,Tabbar } from 'vant';
import router from './router';

const app = createApp(App);

app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(router);



app.mount('#app');

