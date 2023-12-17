<script setup>
import axios from 'axios';
import { ref ,computed, onMounted} from "vue";
import { BIconSearch } from 'bootstrap-icons-vue'
import AdminCategoryEdit from '../administrators/AdminCategoryEdit.vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode  } from 'primevue/api';
import { useAdminStore } from '../../../stores/admin.js'
import { useToast } from "vue-toastification"


const toast = useToast()
const adminStore = useAdminStore()
const categories = ref([])
const showEditPopup = ref(false)

const clickEditButton = () => {
    showEditPopup.value = true
}

const handleClosePopup = () => {
    showEditPopup.value = false;
    loadCategories();
};

const loadCategories = async () => {
    try {
        await adminStore.loadAdmins()
        const response = await axios.get('/defaultcategory')
        
        categories.value = response.data
        loading.value = false
    } catch (error) {
        console.log(error)
        loading.value = false
    }
}

const filters = ref(
    {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
);


const loading = ref(true);

onMounted (() => {
    loadCategories()
})

const selectedCategory = ref(null);

const isSelectedCategory = computed(() => {
  return selectedCategory.value !== null;
})

const deleteSelectedRow = async () =>{
    try {
        await axios.delete('/defaultcategory/' + selectedCategory.value.id);
        toast.success(`Category deleted successfully!`);
    } catch (error) {
        toast.error(error.response)
        debugger
    }finally{
        loadCategories()
    }
}

</script>

<template>

<AdminCategoryEdit :showEditPopup="showEditPopup" :selectedCategory="selectedCategory" @close-popup="handleClosePopup"/>

<div class="container">
        <div class="row">
        <div class="col-12 mt-3">
            <div class="mb-3">
                <h2>Transactions</h2>
                <hr>
            </div>
            
            
<DataTable v-model:filters="filters" :metaKeySelection="false" :loading="loading" 
    removableSort  v-model:selection="selectedCategory" :value="categories"
    stateStorage="session" stateKey="table-vcards" paginator :rows="10" filterDisplay="menu"
    selectionMode="single" :globalFilterFields="['type', 'name']"
    sortField="type" :sortOrder="-1" >
    
    
    <template #header>
    <div class="d-flex justify-content-between align-items-center">
        <span class="p-input-icon-left">
        <BIconSearch />
        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
        </span>

        <div>
            <button
            :class="{ 'btn btn-success': isSelectedCategory, 'btn btn-secondary': !isSelectedCategory }"
            :disabled="!isSelectedCategory"
            @click="clickEditButton">
            Edit Selected Row
        </button>

            <button
            :class="{ 'btn btn-danger': isSelectedCategory, 'btn btn-secondary': !isSelectedCategory }"
            :disabled="!isSelectedCategory"  style="margin-left: 10px"
            @click="deleteSelectedRow">
            Delete Selected Row
        </button>
        </div>
        
    </div>
    </template>



    <Column field="type" header="Type" sortable filterMatchMode="contains" style="width: 10%">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
            <span>
            {{ 
                data.type === 'C' ? 'Credit' : (data.type === 'D' ? 'Debit' : '')
            }}
            </span>
        </div>
      </template>
    </Column>
    <Column field="name" header="Name" sortable filterMatchMode="contains" style="width: 15%">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.name }}</span>
        </div>
      </template>
    </Column>

    <template #empty> No Categories found. </template>
    <template #loading> Loading data. Please wait. </template>
</DataTable>
             </div>
        </div>
    </div>

</template>
