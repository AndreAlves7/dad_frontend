<script setup>
import { onBeforeMount, ref, computed, inject } from 'vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Header from './components/Header.vue'
import config from './utils/config'

const axios = inject('axios')
const _token = ref('')

const loginEnabled = computed(() => {
  return _token.value.length > 0
})

const loginSucceded = (token) => {
  axios.defaults.headers.common.Authorization = 'Bearer ' + token

  localStorage.setItem('token', token)
  _token.value = token
}

const logout = () => {
  axios.post(config.logout).then((response) => {
    console.log(response.data)
    delete axios.defaults.headers.common.Authorization
    localStorage.removeItem('token')
    _token.value = ''
  })
}

onBeforeMount(() => {
  if (localStorage) {
    const token = localStorage.getItem('token') || ''
    if (token.length > 0) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token
      _token.value = token
    }
  }
})
</script>
<template>
  <Header v-if="loginEnabled" @logout="logout" />
  <Login v-if="!loginEnabled" @loginSucceded="loginSucceded" />
  <Dashboard v-else />
  </div>
</template>

<style scoped></style>
