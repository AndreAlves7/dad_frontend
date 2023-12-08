<script setup>
import { ref, onMounted } from 'vue'
import VcardDetail from './VCardDetail.vue'
import { useVcardsStore } from "../../stores/vcard.js"
import { useToast } from "vue-toastification"
import { useRouter } from 'vue-router';

const toast = useToast()
const router = useRouter()
const vcardsStore = useVcardsStore()

const props = defineProps({
  phone_number: {
    type: Number,  
    default: null,
  }
})

const vcard = ref(null)
const errors = ref(null)

let originalVcardStr = ''

const loadVcard = async (phone_number) => {
    originalVcardStr = ''
    try {
        vcard.value = await vcardsStore.loadVcard(phone_number)
        originalVcardStr = JSON.stringify(vcard.value)
    } catch (error) {
        console.log(error)
    }
}

const update = async () => {
    errors.value = null
    try {
        vcard.value = await vcardsStore.updateVcard(vcard.value)
        originalVcardStr = JSON.stringify(vcard.value)
        toast.success("VCard updated successfully!")
        router.back()
    } catch (error) {
        if (error.response.status == 422) {
            // errors.value = error.response.data.errors
            toast.error('VCard #' + props.phone_number + ' was not updated due to validation errors!')
        } else {
            toast.error('VCard #' + props.phone_number + ' was not updated due to unknown server error!')
        }
    }
}

const cancel = () => {
  originalVcardStr = JSON.stringify(vcard.value)
  router.back()
}

onMounted (() => {
    loadVcard(props.phone_number)
})

</script>

<template>
    <vcard-detail v-if="vcard" :vcard="vcard" :errors="errors" @update="update" @cancel="cancel"></vcard-detail>
</template>