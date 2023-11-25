import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user.js"

import Login from "../components/Login.vue"
import Dashboard from "../components/Dashboard.vue"

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
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    if (handlingFirstRoute) {
      handlingFirstRoute = false
      await userStore.restoreToken()
    }
    if ((to.name == 'Login')) {
      next()
      return
    }
    console.log(userStore)
    if (!userStore.user) {
      next({ name: 'Login' })
      return
    }
    next()
})

export default router