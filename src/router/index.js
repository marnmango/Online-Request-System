import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewRequest from '../components/student/newrequest.vue'
import Reg209Student from '../components/student/reg209-student.vue'
import Reg208Student from '../components/student/reg208-student.vue'
import Reg209Staff from '../components/staff/reg209-staff.vue'
import Reg208Staff from '../components/staff/reg208-staff.vue'
import Dashboard from '../components/staff/dashboard.vue'
import ListViewStaff from '../components/staff/listview-staff.vue'
import Reg209Advisor from '../components/advisor/reg209-advisor.vue'
import Reg208Advisor from '../components/advisor/reg208-advisor.vue'
import Reg209Dean from '../components/dean/reg209-dean.vue'
import Reg208Dean from '../components/dean/reg208-dean.vue'
import List from '../components/list.vue'
import Liststudent from '../components/student/list_student.vue'
import Listadvisor from '../components/advisor/list_advisor.vue'
import Listdean from '../components/dean/list_dean.vue'
import ViewReg209 from '../components/student/view/reg209-view.vue'
import ViewReg208 from '../components/student/view/reg208-view.vue'
import login from '../components/login.vue'

Vue.use(VueRouter)

const routes = [{
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
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/newrequest',
        name: 'NewRequest',
        component: NewRequest
    },
    {
        path: '/newrequest',
        redirect: {
            name: "NewRequest"
        }
    },
    {
        path: '/reg209_student',
        name: 'Reg209Student',
        component: Reg209Student,
        meta: {
            requiresAuth: true,
            is_student:true
        }
    },
    {
        path: '/reg208_student',
        name: 'Reg208Student',
        component: Reg208Student,
        meta: {
            requiresAuth: true,
            is_student:true
        }
    },
    {
        path: '/reg209_view/:id',
        name: 'ViewReg209',
        component: ViewReg209,
        meta: {
            requiresAuth: true,
            is_student:true
        }
    },
    {
        path: '/reg208_view/:id',
        name: 'ViewReg208',
        component: ViewReg208,
        meta: {
            requiresAuth: true,
            is_student:true
        }
    },
    {
        path: '/reg209_staff/:id',
        name: 'Reg209Staff',
        component: Reg209Staff,
        meta: {
            requiresAuth: true,
            is_staff:true
        }
    },
    {
        path: '/reg208_staff/:id',
        name: 'Reg208Staff',
        component: Reg208Staff,
        meta: {
            requiresAuth: true,
            is_staff:true
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/reg209_advisor/:id',
        name: 'Reg209Advisor',
        component: Reg209Advisor,
        meta: {
            requiresAuth: true,
            is_advisor:true
        }
    },
    {
        path: '/reg208_advisor/:id',
        name: 'Reg208Advisor',
        component: Reg208Advisor,
        meta: {
            requiresAuth: true,
            is_advisor:true
        }
    },
    {
        path: '/reg209_dean/:id',
        name: 'Reg209Dean',
        component: Reg209Dean,
        meta: {
            requiresAuth: true,
            is_dean:true
        }
    },
    {
        path: '/reg208_dean/:id',
        name: 'Reg208Dean',
        component: Reg208Dean,
        meta: {
            requiresAuth: true,
            is_dean:true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/list',
        redirect: {
            name: "List"
        }
    },
    {
        path: '/list',
        name: 'List',
        component: List,
        meta: {
            requiresAuth: true,
            is_staff:true
        }
    }, {
        path: '/list-student',
        redirect: {
            name: "Liststudent"
        }
    }, {
        path: '/list-student',
        name: 'Liststudent',
        component: Liststudent,
        meta: {
            requiresAuth: true,
            is_student:true
        }
    }, {
        path: '/list-advisor',
        redirect: {
            name: "Listadvisor"
        }
    },
    {
        path: '/list-advisor',
        name: 'Listadvisor',
        component: Listadvisor,
        meta: {
            requiresAuth: true,
            is_advisor:true
        }
    }, {
        path: '/list-dean',
        redirect: {
            name: "Listdean"
        }
    },
    {
        path: '/list-dean',
        name: 'Listdean',
        component: Listdean,
        meta: {
            requiresAuth: true,
            is_dean:true
        }
    },
    {
        path: '/list-view',
        redirect: {
            name: "ListViewStaff"
        }
    },
    {
        path: '/list-view',
        name: 'ListViewStaff',
        component: ListViewStaff,
        meta: {
            requiresAuth: true,
            is_staff:true
        }
    }

]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (sessionStorage.getItem('jwt') == null) {
            next({
                path: '/login'
            })
        }else{
            let user = JSON.parse(sessionStorage.getItem('user')).user_role
            if(to.matched.some(record => record.meta.is_student)) {
                if(user=="student"){
                    sessionStorage.setItem('allow',true)
                    next()
                }else{
                    sessionStorage.clear()
                    next({
                        path: '/login'
                    })
                }
            }else if(to.matched.some(record => record.meta.is_staff)) {
                if(user=="staff"){
                    sessionStorage.setItem('allow',true)
                    next()
                }else{
                    sessionStorage.clear()
                    next({
                        path: '/login'
                    })
                }
            }else if(to.matched.some(record => record.meta.is_advisor)) {
                if(user=="advisor"){
                    sessionStorage.setItem('allow',true)
                    next()
                }else{
                    sessionStorage.clear()
                    next({
                        path: '/login'
                    })
                }
            }else if(to.matched.some(record => record.meta.is_dean)) {
                if(user=="dean"){
                    sessionStorage.setItem('allow',true)
                    next()
                }else{
                    sessionStorage.clear()
                    next({
                        path: '/login'
                    })
                }
            }else{
                next()
            }
        }
    }else {
        if(!JSON.parse(sessionStorage.getItem('allow'))){
            console.log(JSON.parse(sessionStorage.getItem('allow')))
            next()
        }else{
            let user = JSON.parse(sessionStorage.getItem('user')).user_role
          if(user=="student"){
            next({
                path: '/list-student'
            })
          }else if(user=="staff"){
            next({
                path: '/list'
            })
          }else if(user=="advisor"){
            next({
                path: '/list-advisor'
            })
          }else if(user=="dean"){
            next({
                path: '/list-dean'
            })
          }else{
              console.log('')
          }
        }
    }
})

export default router