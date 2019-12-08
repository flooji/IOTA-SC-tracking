import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Producer from './views/Producer.vue'
import Logistics from './views/Logistics.vue'
import Authorities from './views/Authorities.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, 
    {
      path: '/producer',
      name: 'producer',
      component: Producer
    },
    {
      path: '/logistics',
      name: 'logistics',
      component: Logistics
    },
    {
      path: '/authorities',
      name: 'authorities',
      component: Authorities
    }
  ]
})