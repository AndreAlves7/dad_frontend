<script setup>
import { inject, ref } from "vue";
import { useRouter } from 'vue-router'
import { BIconSearch, BIconPencil } from 'bootstrap-icons-vue'
import avatarNoneUrl from '@/assets/avatar-none.png'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';

import { FilterMatchMode, FilterOperator } from 'primevue/api';

const serverBaseUrl = inject("serverBaseUrl");
const router = useRouter()

const props = defineProps({
  vcards: {
    type: Array,  
    default: () => [],
  },
})

const photoFullUrl = (photo_url) => {
  return photo_url
    ? serverBaseUrl + "/storage/fotos/" + photo_url
    : avatarNoneUrl;
}

const editClick = (phone_number) => {
  router.push({ name: 'Vcard', params: { phone_number: phone_number } })
}

const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    }
);

const selectedVcard = ref();

const getSeverity = (status) => {
    switch (status) {
        case 1:
            return 'danger';

        case 0:
            return 'success';
    }
};

</script>

<template>

<DataTable v-model:filters="filters" v-model:selection="selectedVcard" :value="vcards"
    stateStorage="session" stateKey="dt-state-demo-session" paginator :rows="10" filterDisplay="menu"
    selectionMode="single" dataKey="phone_number" :globalFilterFields="['phone_number', 'name', 'email']">
    <template #header>
        <span class="p-input-icon-left">
            <BIconSearch />
            <InputText v-model="filters['global'].value" placeholder="Search" />
        </span>
    </template>
    <Column header="Photo" style="width: 5%" >
      <template #body="{ data }">
        <img :src="photoFullUrl(data.photo_url)" class="rounded-circle img_photo" />
      </template>
    </Column>
    <Column field="phone_number" header="Phone number" sortable filterMatchMode="contains" style="width: 50%">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.phone_number }}</span>
        </div>
      </template>
    </Column>
    <Column field="name" header="Name" sortable filterMatchMode="contains" style="width: 70%">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.name }}</span>
        </div>
      </template>
    </Column>
    <Column field="email" header="E-mail" sortable sortField="email" filterField="email" filterMatchMode="contains" style="width: 45%">
        <template #body="{ data }">
            <div class="flex align-items-center gap-2">
                <span>{{ data.email }}</span>
            </div>
        </template>
    </Column>
    <Column field="blocked" header="Status" sortable filterMatchMode="equals" style="width: 25%">
        <template #body="{ data }">
            <Tag :value="data.blocked" :severity="getSeverity(data.blocked)" />
        </template>
    </Column>
    <Column header="Actions" style="width: 25%">
      <template #body="{ data }">
        <button class="btn btn-xs btn-light" @click="editClick(data.phone_number)" >
          <BIconPencil class="bi bi-xs" />
        </button>
      </template>
    </Column>
    <template #empty> No VCards found. </template>
</DataTable>

<!-- 
    <table class="table">
    <thead>
      <tr>
        <th class="align-middle">Photo</th>
        <th class="align-middle">Phone Number</th>
        <th class="align-middle">Name</th>
        <th class="align-middle">Email</th>
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
  </table> -->
</template>

<style scoped>
.img_photo {
  width: 2.6rem;
  height: 2.6rem;
}
</style>