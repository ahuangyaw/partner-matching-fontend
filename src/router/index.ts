import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/IndexView.vue'
import My from "@/views/MyView.vue";
import Partner from '@/views/PartnerView.vue'
import Team from '@/views/TeamView.vue'
import Search from '@/views/SearchView.vue'
import MyEdit from "@/views/MyEditView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/index', redirect: '/'},
        {path: '/', component: Index},
        {path: '/team', component: Team},
        {path: '/partner', component: Partner},
        {path: '/my',  component: My},
        {path: '/search', component: Search},
        {path: '/my/edit/:', component: MyEdit},

    ],
})

export default router