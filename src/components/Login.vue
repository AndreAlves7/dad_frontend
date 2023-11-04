<template lang="">
    <div>
        <input v-model= "username" placeholder ="Username"/>
        <input v-model= "password" placeholder ="Password"/>
        <button @click = "login">Click to Login</button>
    </div>
</template>
<script setup>
    import { ref, inject } from 'vue'
    import config from '../utils/config'
    const axios = inject('axios')
    //const emits = defineEmits(['loginEvent'])

    
    const emit = defineEmits([
        'loginSucceded'
    ])

    const username = ref('a1@mail.pt')
    const password = ref('123')
    const responseData = ref('')

    const login = async () => {
        const responseLogin = await axios.post(config.login, {
            username: username.value,
            password: password.value
        })


        emit('loginSucceded', responseLogin.data.access_token)

       


        // const responseRequest = await axios.get('/vcard')

        // axios.defaults.headers.common.Authorization = "Bearer " + responseLogin.data.access_token
        // const responseRequest = await axios.get('/vcard')
        
        // console.log(responseRequest)
        // responseData.value = responseRequest.data
    }

    
</script>


<style>
    
</style>