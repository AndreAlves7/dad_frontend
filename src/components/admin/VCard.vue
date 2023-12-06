<script setup>
import { ref, onMounted } from 'vue'
import VcardDetail from './VCardDetail.vue'
import { useVcardsStore } from "../../stores/vcard.js"

const vcardsStore = useVcardsStore()

const props = defineProps({
  phone_number: {
    type: Number,  
    default: null,
  },
})

const vcard = ref({})

const loadVcard = async (phone_number) => {
    try {
        vcard.value = await vcardsStore.loadVcard(phone_number)
        console.log(vcard.value)
    } catch (error) {
        console.log(error)
    }
}

onMounted (() => {
    loadVcard(props.phone_number)
})

</script>

<template>
    <vcard-detail :vcard="vcard"></vcard-detail>
</template>