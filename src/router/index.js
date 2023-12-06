import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user.js"

import Login from "../components/Login.vue"
import Dashboard from "../components/Dashboard.vue"
import Signup from "../components/auth/Signup.vue"
import Vcards from "../components/admin/Vcards.vue"
import Vcard from "../components/admin/Vcard.vue"

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
    next()
})

export default router