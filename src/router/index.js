import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reg209Student from '../components/student/reg209-student.vue'
import Reg209Staff from '../components/staff/reg209-staff.vue'
import List from '../components/list.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/reg209_student',
    name: 'Reg209Student',
    component: Reg209Student
  },
  {
    path: '/reg209_staff',
    name: 'Reg209Staff',
    component: Reg209Staff
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
 
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
