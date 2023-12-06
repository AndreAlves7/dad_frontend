<script setup>
import { ref, inject } from 'vue'
const serverBaseUrl = inject("serverBaseUrl");
import avatarNoneUrl from '@/assets/avatar-none.png'

const props = defineProps({
  vcard: {
    type: Object,  
    required: true,
  },
})

const editingVcard = ref(props.vcard)
console.log(editingVcard)

const photoFullUrl = (vcard) => {
  return vcard.photo_url
    ? serverBaseUrl + "/storage/fotos/" + vcard.photo_url
    : avatarNoneUrl;
}

</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="my-5">
				    <h3>VCard Details</h3>
				    <hr>
			    </div>
          <div class="row justify-content-md-center">
            <div class="col-md-2 border">
              <img :src="photoFullUrl(props.vcard)" class="rounded-circle img_photo" />
              <div class="text-center mt-2">{{ props.vcard.email }}</div>
            </div>
            <div class="col-md-10">
              <div class="col-md-8">
                <div class="mb-3">
							    <label class="form-label">Phone Number</label>
  							  <input :value="props.vcard.phone_number" type="text" class="form-control" aria-label="Phone number" disabled >
                </div>
                <div class="mb-3">
                  <label class="form-label">Name</label>
  							  <input :value="props.vcard.name" type="text" class="form-control" aria-label="Name" disabled >
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Balance</label>
                    <span class="input-group-text"></span>
                    <input :value="props.vcard.balance" type="number" class="form-control" aria-label="Balance" disabled >
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Maximum Debit</label>
                    <input :value="props.vcard.max_debit" type="number" class="form-control" aria-label="Max. debit" >
                  </div>
                </div>
                <div>
                    <select v-model="editingVcard.blocked" class="form-select" aria-label="Status">
                      <option :value="null"></option>
                      <option value="0">Not blocked</option>
                      <option value="1">Blocked</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>