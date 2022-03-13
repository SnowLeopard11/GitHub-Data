import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/app'
import data from '@/views/data'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path:'/data',
    name:'data/',
    component: index
  },
  {
    path:'/data/:user',
    name:'data',
    component:data
  }
]

const router = new VueRouter({
  routes
})

export default router
