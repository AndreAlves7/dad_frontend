import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user.js"

import Login from "../components/Login.vue"
import Dashboard from "../components/Dashboard.vue"
import Signup from "../components/auth/Signup.vue"
import Vcards from "../components/admin/Vcards.vue"
import Vcard from "../components/admin/Vcard.vue"
import Admins from "../components/admin/administrators/Admin.vue"
import adminCreate from "../components/admin/administrators/adminCreate.vue"
import Transactions from "../components/TransactionsTable.vue"
import VCardStatistics from "../components/VCardStatistics.vue"


let handlingFirstRoute = true

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Dashboard
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/admin/vcards',
            name: 'Vcards',
            component: Vcards
        },
        {
            path: '/admin/vcards/:phone_number',
            name: 'Vcard',
            component: Vcard,
            props: route => ({ phone_number: parseInt(route.params.phone_number) })
        },
        {
            path: '/admin/admins',
            name: 'Admins',
            component: Admins
        },
        {
            path: '/admin/add',
            name: 'AddAdmin',
            component: adminCreate
        },
        {
            path: '/vcard/transactions',
            name: 'Transactions',
            component: Transactions
        },
        {
            path: '/statistics/vcard',
            name: 'VCardStatistics',
            component: VCardStatistics
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (handlingFirstRoute) {
      handlingFirstRoute = false
      await userStore.restoreToken()
    }
    if ((to.name == 'Login') || (to.name == 'Signup')) {
      next()
      return
    }
    if (!userStore.user) {
      next({ name: 'Login' })
      return
    }
    if(userStore.userType == 'A' && (to.name == 'Dashboard' || to.name == 'home')) {
        next({name: 'Vcards'})
        return
    }
    next()
})

export default router