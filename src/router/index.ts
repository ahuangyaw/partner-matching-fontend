import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/IndexView.vue'
import My from '../views/MyView.vue'
import PartnerView from '../views/PartnerView.vue'
import TeanView from '../views/TeamView.vue'

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
      component: PartnerView
    },
    {
      path: '/team',
      name: 'team',
      component: TeanView
    },
  ],
})

export default router