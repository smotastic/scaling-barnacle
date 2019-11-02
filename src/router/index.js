import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HostRoom from '../views/HostRoom.vue';
import JoinRoom from '../views/JoinRoom.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/hostroom/:id',
    name: 'hostroom',
    component: HostRoom,
    props: true
  },
  {
    path: '/joinroom/:id',
    name: 'joinroom',
    component: JoinRoom,
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
