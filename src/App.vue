<script setup>
import { useRouter, RouterView } from 'vue-router';
import { useToast } from "vue-toastification"
import { useUserStore } from './stores/user.js'

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

// const clickMenuOption = () => {
//   const domReference = document.getElementById('buttonSidebarExpandId')
//   if (domReference) {
//     if (window.getComputedStyle(domReference).display !== "none") {
//       domReference.click()
//     }
//   }
// }

const logout = async () => {
  if (await userStore.logout()) {
    toast.success('Sucessfully logged out of the application!')
    router.push({ name: 'Login' })
  } else {
    toast.error('There was a problem logging out of the application!')
  }
}

</script>


<template>

  <nav v-if="userStore.user" class="navbar navbar-expand-md navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow">
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="btn btn-outline-warning" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="ms-sm-auto col-lg-10 px-md-4">
    <router-view></router-view>
  </main>
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
