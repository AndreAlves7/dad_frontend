<script setup>
// import { onBeforeMount, ref, computed, inject } from 'vue'

import Login from './components/Login.vue'
// import Dashboard from './components/Dashboard.vue'
// import Header from './components/Header.vue'
// import routes from './utils/routes'

// const axios = inject('axios')
// const _token = ref('')

// const loginEnabled = computed(() => {
//   return _token.value.length > 0
// })

// const loginSucceded = (token) => {
//   axios.defaults.headers.common.Authorization = 'Bearer ' + token

//   localStorage.setItem('token', token)
//   _token.value = token
// }

// const logout = () => {
//   axios.post(routes.logout).then((response) => {
//     console.log(response.data)
//     delete axios.defaults.headers.common.Authorization
//     localStorage.removeItem('token')
//     _token.value = ''
//   })
// }

// onBeforeMount(() => {
//   if (localStorage) {
//     const token = localStorage.getItem('token') || ''
//     if (token.length > 0) {
//       axios.defaults.headers.common.Authorization = 'Bearer ' + token
//       _token.value = token
//     }
//   }
// })


const clickMenuOption = () => {
  const domReference = document.getElementById('buttonSidebarExpandId')
  if (domReference) {
    if (window.getComputedStyle(domReference).display !== "none") {
      domReference.click()
    }
  }
}
</script>


<template>
  <Login />
</template>

<style>
@import "./assets/dashboard.css";

.avatar-img {
  margin: -1.2rem 0.8rem -2rem 0.8rem;
  width: 3.3rem;
  height: 3.3rem;
}

.avatar-text {
  line-height: 2.2rem;
  margin: 1rem 0.5rem -2rem 0;
  padding-top: 1rem;
}

.dropdown-item {
  font-size: 0.875rem;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

#sidebarMenu {
  overflow-y: auto;
}
</style>
