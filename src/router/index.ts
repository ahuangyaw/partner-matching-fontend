import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/IndexView.vue'
import My from '@/views/MyView.vue'
import Partner from '@/views/PartnerView.vue'
import Tean from '@/views/TeamView.vue'
import Search from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/index',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/partner',
      name: 'partner',
      component: Partner
    },
    {
      path: '/team',
      name: 'team',
      component: Tean
    },
    {
      path: '/search',
      name: 'tesearcham',
      component: Search
    },
  ],
})

export default router