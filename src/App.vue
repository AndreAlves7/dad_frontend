<script setup>
import { onBeforeMount, ref, computed, inject } from 'vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Header from './components/Header.vue'

const axios = inject('axios')
const _token = ref('')

const loginEnabled = computed(() => {
  return _token.value.length > 0
})

const loginSucceded = (token) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    },

    (error) => {
      return Promise.reject(error)
    }
  )

  localStorage.setItem('token', token)
  _token.value = token
}


const logout = () => {
  localStorage.removeItem('token')
  _token.value = ''
}

onBeforeMount(() => {
  if (localStorage) {
    _token.value = localStorage.getItem('token') || ''
  }
})
</script>
<template>
  <Header v-if="loginEnabled" @logout="logout"/>
  <Login v-if="!loginEnabled" @loginSucceded="loginSucceded" />
  <Dashboard v-else />
</template>

<style scoped></style>
