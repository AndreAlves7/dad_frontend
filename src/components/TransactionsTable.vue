<script setup>
import axios from 'axios';
import { ref , onMounted} from "vue";
import { BIconSearch } from 'bootstrap-icons-vue'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { useUserStore } from '../stores/user.js';
import { FilterMatchMode  } from 'primevue/api';

const userStore = useUserStore()

const transactions = ref([])

const loadTransactions = async () => {
    try {
        await userStore.loadUser()
        // console.log(userStore.user)
        const response = await axios.get('/vcard/transaction/' + userStore.user.id)
        
        transactions.value = response.data.transactions
        // console.log(transactions.value)
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
    loadTransactions()
})

const selectedTransaction = ref();

</script>

<template>
<div class="container">
        <div class="row">
        <div class="col-12 mt-3">
            <div class="mb-3">
                <h2>Transactions</h2>
                <hr>
            </div>
            
<DataTable v-model:filters="filters" :metaKeySelection="false" :loading="loading" 
    removableSort  v-model:selection="selectedTransaction" :value="transactions"
    stateStorage="session" stateKey="table-vcards" paginator :rows="10" filterDisplay="menu"
    selectionMode="single" :globalFilterFields="['date', 'value', 'old_balance' , 
    'new_balance', 'payment_type', 'payment_reference', 'value']"
    sortField="date" :sortOrder="-1" >
    
    <template #header>
        <span class="p-input-icon-left">
            <BIconSearch />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
        </span>
    </template>

    <Column field="date" header="Date" sortable filterMatchMode="contains" style="width: 10%">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.date }}</span>
        </div>
      </template>
    </Column>

    <Column field="type" header="Type" sortable filterMatchMode="contains" style="width: 10%">
      <template #body="{ data }">
        <div class="flex align-items-center gap-1">
            <span>
            {{ 
                data.type === 'C' ? 'Credit' : (data.type === 'D' ? 'Debit' : '')
            }}
            </span>

        </div>
      </template>
    </Column>
    <Column field="value" header="Value" sortable filterMatchMode="contains" style="width: 15%">
      <template #body="{ data }">
        <div class="flex align-items-center gap-2">
          <span>{{ data.value }}</span>
        </div>
      </template>
    </Column>
    <Column field="old_balance" header="Old Balance" sortable filterMatchMode="contains" style="width: 15%">
        <template #body="{ data }">
            <div class="flex align-items-center gap-2">
                <span>{{ data.old_balance }}</span>
            </div>
        </template>
    </Column>
    <Column field="new_balance" header="New Balance" sortable filterMatchMode="contains" style="width: 15%">
        <template #body="{ data }">
            <div class="flex align-items-center gap-2">
                <span>{{ data.new_balance }}</span>
            </div>
        </template>
    </Column>
    <Column field="payment_type" header="Payment Type" sortable filterMatchMode="contains" style="width: 15%">
        <template #body="{ data }">
            <div class="flex align-items-center gap-2">
                <span>{{ data.payment_type }}</span>
            </div>
        </template>
    </Column>
    <Column field="payment_reference" header="Payment Reference" sortable filterMatchMode="contains" style="width: 35%">
        <template #body="{ data }">
            <div class="flex align-items-center gap-2">
                <span>{{ data.payment_reference }}</span>
            </div>
        </template>
    </Column>

    <template #empty> No Transactions found. </template>
    <template #loading> Loading data. Please wait. </template>
</DataTable>
             </div>
        </div>
    </div>

</template>
