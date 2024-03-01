import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/index/IndexView.vue'
import My from "@/views/index/MyView.vue";
import Partner from '@/views/index/PartnerView.vue'
import Team from '@/views/index/TeamView.vue'
import Search from '@/views/search/SearchView.vue'
import MyEdit from "@/views/My/MyEditView.vue";
import SearchResult from "@/views/search/SearchResultView.vue";
import MyLogin from "@/views/My/MyLoginView.vue";

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
        {path: '/my/list/:', component: SearchResult},
        {path: '/my/login/:', component: MyLogin},

    ],
})

export default router