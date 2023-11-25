<script setup>
import { ref } from 'vue'
import { useToast } from "vue-toastification"
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
// import routes from '../utils/routes'

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

const credentials = ref({
  username: '',
  password: ''
})

const login = async () => {
  if (await userStore.login(credentials.value)) {
    console.log()
    toast.success('User ' + userStore.name + ' has entered the application.')
    router.push({ name: 'Dashboard' })
  } else {
    // credentials.value.password = ''
    toast.error('User credentials are invalid!')
  }

  // const responseRequest = await axios.get('/vcard')

  // axios.defaults.headers.common.Authorization = "Bearer " + responseLogin.data.access_token
  // const responseRequest = await axios.get('/vcard')

  // console.log(responseRequest)
  // responseData.value = responseRequest.data
}
</script>

<template>
  <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">VCARD</h2>
                  <p class="text-white-50 mb-5">Your favorite virtual card!</p>
                  <div class="form-group form-outline form-white mb-4">
                    <input v-model="credentials.username" id="emailInput" class="form-control" type="email" placeholder="Username"/>
                  </div>
                  <div class="form-group form-outline form-white mb-4">
                    <input v-model="credentials.password" id="passwordInput"  class="form-control" type="password" placeholder="Password"/>
                  </div>
                  <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                  <button @click="login" class="btn btn-outline-light px-5" type="submit">Login</button>
                </div>
                <div>
                  <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<style></style>
