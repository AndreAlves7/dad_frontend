import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { io } from 'socket.io-client'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import FieldErrorMessage from './components/global/FieldErrorMessage.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const apiDomain = import.meta.env.VITE_API_DOMAIN
// const wsConnection = import.meta.env.VITE_WS_CONNECTION
// app.provide('socket', io(wsConnection))
const wsConnection = import.meta.env.VITE_WS_CONNECTION

app.provide('socket', io(wsConnection))

app.provide('serverBaseUrl', apiDomain)
axios.defaults.baseURL = apiDomain + '/api'
axios.defaults.headers.common['Content-type'] = 'application/json'

// default toast configuration
app.use(Toast, {
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
})

app.use(createPinia())
app.use(router)

app.use(BootstrapIconsPlugin)

app.component('FieldErrorMessage', FieldErrorMessage)

app.mount('#app')
