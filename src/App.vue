<script setup>
import ProfileEdit from './components/ProfileEdit.vue';
import { useRouter, RouterView } from 'vue-router';
import { useToast } from "vue-toastification"
import { useUserStore } from './stores/user.js'
import { ref } from 'vue'

const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

const showProfilePopup = ref(false)

const clickProfileOption = () => {
  showProfilePopup.value = !showProfilePopup.value
}

const handleClosePopup = () => {
  showProfilePopup.value = false;
};

const clickMenuOption = () => {
  const domReference = document.getElementById('buttonSidebarExpandId')
  if (domReference) {
    if (window.getComputedStyle(domReference).display !== "none") {
      domReference.click()
    }
  }
}

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
  
    <ProfileEdit :showProfilePopup="showProfilePopup" @close-popup="handleClosePopup"/>  

  <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top flex-md-nowrap p-0 shadow" v-if="userStore.user">
    <div class="container-fluid">
      <router-link class="navbar-brand col-md-3 col-lg-2 me-0 px-3" :to="{ name: 'home' }" @click="clickMenuOption">
        <img src="@/assets/logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
        App name
      </router-link>
      <button id="buttonSidebarExpandId" class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item dropdown" v-show="userStore.user">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <img :src="userStore.userPhotoUrl" class="rounded-circle z-depth-0 avatar-img" alt="avatar image">
              <span class="avatar-text">{{ userStore.user.username }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a class="dropdown-item" @click="clickProfileOption">
                  <i class="bi bi-person-square"></i>
                  Profile
                </a>
                <!-- <router-link class="dropdown-item"
                            :class="{ active: $route.name == 'User' && $route.params.id == userStore.userId }"
                            :to="{ name: 'User', params: { id: userStore.userId } }" @click="clickMenuOption">
                  <i class="bi bi-person-square"></i>
                  Profile
                </router-link> -->
              </li>
              <li>
                <a class="dropdown-item">
                  <i class="bi bi-key-fill"></i>
                  Change password
                </a>
                <!-- <router-link class="dropdown-item" :class="{ active: $route.name === 'ChangePassword' }"
                              :to="{ name: 'ChangePassword' }" @click="clickMenuOption">
                  <i class="bi bi-key-fill"></i>
                  Change password
                </router-link> -->
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <a class="dropdown-item" @click.prevent="logout">
                  <i class="bi bi-arrow-right"></i>Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid" v-if="userStore.user">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column" v-if="userStore.user">
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.name === 'Dashboard' }"
                          :to="{ name: 'Dashboard' }" @click="clickMenuOption">
                <i class="bi bi-house"></i>
                Dashboard
              </router-link>
            </li>
          </ul>

          <h6 v-if="userStore.user?.user_type == 'A'"
           class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted" >
            <span>Administration</span>
            <!-- <router-link
              class="link-secondary" :to="{ name: 'NewProject' }" aria-label="Add a new project" @click="clickMenuOption">
              <i class="bi bi-xs bi-plus-circle"></i>
            </router-link> -->
          </h6>

          <ul v-if="userStore.user?.user_type == 'A'"
           class="nav flex-column mb-2">
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.name === 'Vcards' }"
                          :to="{ name: 'Vcards' }" @click="clickMenuOption">
                <i class="bi bi-house"></i>
                vCards
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

  <main v-if="userStore.user" class="ms-sm-auto col-lg-10 px-md-4">
    <router-view></router-view>
  </main>
  <main v-else>
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
