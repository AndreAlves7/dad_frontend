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
                        <input v-model="username" id="emailInput" class="form-control" type="email" placeholder="Username"/>
                    </div>
    
                    <div class="form-group form-outline form-white mb-4">
                        <input v-model= "password" id="passwordInput"  class="form-control" type="password" placeholder="Password"/>
                    </div>
      
                    <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
    
                    <button @click="login" class="btn btn-outline-light px-5" type="submit">Login</button>
                  </div>
      
                  <div>
                    <p class="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                    </p>
                  </div>
      
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
</template>
<script setup>
import { ref, inject } from 'vue'
import config from '../utils/config'
const axios = inject('axios')
//const emits = defineEmits(['loginEvent'])

const emit = defineEmits(['loginSucceded'])

const username = ref('a1@mail.pt')
const password = ref('123')

const login = async () => {
  try {
    const responseLogin = await axios.post(config.login, {
      username: username.value,
      password: password.value
    })

    console.log(responseLogin.data)

    emit('loginSucceded', responseLogin.data.access_token)
  } catch (error) {
    alert('Login failed')
  }

  // const responseRequest = await axios.get('/vcard')

  // axios.defaults.headers.common.Authorization = "Bearer " + responseLogin.data.access_token
  // const responseRequest = await axios.get('/vcard')

  // console.log(responseRequest)
  // responseData.value = responseRequest.data
}
</script>

<style></style>
