<script setup>
import {  ref } from "vue";
import { BIconPencil } from 'bootstrap-icons-vue'
import {useAdminStore} from '../../../stores/admin.js'
import { useToast } from "vue-toastification"





const props = defineProps({
  admins: {
    type: Array,  
    default: () => [],
  },
})

// const photoFullUrl = (vcard) => {
//   return vcard.photo_url
//     ? serverBaseUrl + "/storage/fotos/" + vcard.photo_url
//     : avatarNoneUrl;
// }
const adminStore = useAdminStore()

const toast = useToast()
const modalDelete = ref(false)
const userToDelete = ref(null)


const deleteUser = async () => {
  if ( await adminStore.deleteAdmin(userToDelete.value.id)) {
    toast.success('Sucessfully deleted the administrator!')
  } else {
    toast.error('There was a problem deleting the administrator!')
  }
  modalDelete.value = false
}

const modalDeleteUser = async (admin) => {

  userToDelete.value = admin
  modalDelete.value = true

};



</script>

<template>
   <!-- <pre>{{ props.admins }}</pre> -->
   <!-- button to add admin -->
    <div class="d-flex justify-content-end">
        <router-link class="btn btn-primary" :to="{ name: 'AddAdmin' }">Create Admin</router-link>
    </div>
   <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <!-- <th class="align-middle">Balance</th>
          <th class="align-middle">Max. Debit</th> -->
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <BModal v-model="modalDelete" :title="userToDelete?.name">
          <p>Are you sure you want to delete the administrator?</p>

          <template #footer="{ cancel }">
            <button class="btn btn-secondary" @click="cancel()">Cancel</button>
            <button class="btn btn-danger" @click="deleteUser(userToDelete)">Delete</button>
          </template>
        </BModal>
        
        <tr v-for="admin in props.admins" :key="admin.id" >
          <!-- {{ admin }} -->
          <td>{{ admin.name }}</td>
          <td>{{ admin.email }}</td>
          <!-- <td class="align-middle">{{ vcard.balance }} €</td>
          <td class="align-middle">{{ vcard.max_debit }} €</td> -->
          <td class="text-end" >
            <div class="d-flex justify-content-end">
              <button class="btn btn-xs btn-light" @click="modalDeleteUser(admin)" >
                <BIconPencil class="bi bi-xs" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
   </table>
</template>

<style scoped>
.img_photo {
  width: 2.6rem;
  height: 2.6rem;
}
</style>