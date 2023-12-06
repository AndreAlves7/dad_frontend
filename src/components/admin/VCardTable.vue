<script setup>
import { inject } from "vue";
import { useRouter } from 'vue-router'
import { BIconBan, BIconPencil } from 'bootstrap-icons-vue'
import avatarNoneUrl from '@/assets/avatar-none.png'

const serverBaseUrl = inject("serverBaseUrl");
const router = useRouter()

const props = defineProps({
  vcards: {
    type: Array,  
    default: () => [],
  },
})

const photoFullUrl = (vcard) => {
  return vcard.photo_url
    ? serverBaseUrl + "/storage/fotos/" + vcard.photo_url
    : avatarNoneUrl;
}

const editClick = (vcard) => {
  router.push({ name: 'Vcard', params: { phone_number: vcard.phone_number } })
}

</script>

<template>
    <table class="table">
    <thead>
      <tr>
        <th class="align-middle">Photo</th>
        <th class="align-middle">Phone Number</th>
        <th class="align-middle">Name</th>
        <th class="align-middle">Email</th>
        <!-- <th class="align-middle">Balance</th>
        <th class="align-middle">Max. Debit</th> -->
        <th class="align-middle">Blocked</th>
        <th class="align-middle">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vcard in vcards" :key="vcard.phone_number" >
        <td class="align-middle">
          <img :src="photoFullUrl(vcard)" class="rounded-circle img_photo" />
        </td>
        <td class="align-middle">{{ vcard.phone_number }}</td>
        <td class="align-middle">{{ vcard.name }}</td>
        <td class="align-middle">{{ vcard.email }}</td>
        <!-- <td class="align-middle">{{ vcard.balance }} €</td>
        <td class="align-middle">{{ vcard.max_debit }} €</td> -->
        <td class="align-middle text-danger"><BIconBan v-show="vcard.blocked" /></td>
        <td class="text-end align-middle" >
          <div class="d-flex justify-content-end">
            <button class="btn btn-xs btn-light" @click="editClick(vcard)" >
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