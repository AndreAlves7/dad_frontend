<script setup>
import axios from 'axios'
import routes from '../../utils/routes'
import { ref, onMounted } from 'vue'
import VcardTable from './VCardTable.vue'

const vcards = ref([])

const loadVcards = async () => {
    try {
        const response = await axios.get(routes.vcard)
        vcards.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}

onMounted (() => {
    loadVcards()
})

</script>

<template>
    <div class="container">
        <div class="row">
        <div class="col-12 mt-3">
            <h2>VCards</h2>
            <vcard-table :vcards="vcards"></vcard-table>
        </div>
        </div>
    </div>
</template>