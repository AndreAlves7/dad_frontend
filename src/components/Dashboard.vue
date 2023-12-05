
<script setup>
import WebSocketTester from './WebSocketTester.vue';

import { ref, onMounted, } from 'vue'
import axios from 'axios'
import routes from '../utils/routes'
import { useUserStore } from '../stores/user.js'

const vcard = ref(null)
const userStore = useUserStore()

onMounted(async()=>{
  // const result = await axios.ge/t('/vcard/' + userStore.user.username);
  const result = await axios.get(`${routes.vcard}/${userStore.user.username}`);
  vcard.value = result.data.data;
})

</script>

<template>

  <div class="styleResponse">
          <h2>Response</h2>
          <p>{{vcard}}</p>
  </div>
    <WebSocketTester />
  
  </template>
  

<style scoped>
  .styleResponse{
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
      text-align: center;
  }
  
</style>