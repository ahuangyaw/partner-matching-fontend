import {createRouter, createWebHashHistory} from 'vue-router'
import Index from '@/views/index/IndexView.vue'
import My from "@/views/index/MyView.vue";
import Partner from '@/views/index/PartnerView.vue'
import Team from '@/views/index/TeamView.vue'
import Search from '@/views/search/SearchView.vue'
import MyEdit from "@/views/My/MyEditView.vue";
import SearchResult from "@/views/search/SearchResultView.vue";
import MyLogin from "@/views/My/MyLoginView.vue";
import AddTeam from "@/views/team/addTeamView.vue";
import Update from "@/views/team/updateTeamView.vue";
import MyUpdate from "@/views/My/MyUpdateView.vue";
import MyCreateTeam from "@/views/My/MyCreateTeamView.vue";
import MyJoinTeam from "@/views/My/MyJoinTeamView.vue";
import MyRegister from "@/views/My/MyRegisterView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/index', redirect: '/'},
        {path: '/', component: Index},
        {path: '/team', name: '队伍', component: Team},
        {path: '/team/add/:', name: '创建队伍', component: AddTeam},
        {path: '/team/update/:', name: '修改队伍信息', component: Update},
        {path: '/partner', name: '伙伴', component: Partner},
        {path: '/my', name: '我的', component: My},
        {path: '/search', name: '', component: Search},
        {path: '/my/edit/:', name: '修改信息', component: MyEdit},
        {path: '/search/list/:', name: '个人中心', component: SearchResult},
        {path: '/my/login/:', name: '登录', component: MyLogin},
        {path: '/my/register/:', name: '注册', component: MyRegister},
        {path: '/my/update/:', name: '', component: MyUpdate},
        {path: '/my/team/create:', name: '我创建的队伍', component: MyCreateTeam},
        {path: '/my/team/join:', name: '我加入的队伍', component: MyJoinTeam},
    ],
})

export default router