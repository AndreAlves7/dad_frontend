import axios from 'axios'
import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import avatarNoneUrl from '@/assets/avatar-none.png'

import routes from '../utils/routes'

export const useUserStore = defineStore('administrators', () => {
    
    const serverBaseUrl = inject('serverBaseUrl')
    const admins = ref(null)


    const loadAdmins = async () => {
        try {
            const response = await axios.get(routes.admins)
            admins.value = response.data
        } catch (error) {
           console.log(error)
        }
    }


})