<template>
    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="transactionValue">Transaction Value</label>
          <InputNumber v-model="value" inputId="currency-germany" mode="currency" currency="EUR" locale="de-DE" />
        </div>
        <div class="form-group">
          <label for="paymentType">Payment Type</label>
          <Dropdown v-model="selectedType" :options="paymentTypes" optionLabel="name" placeholder="Payment Type" class="w-full"   />
        </div>
        <div class="form-group">
          <label for="paymentType">Reference </label>
          <InputText v-model="form.referenceValue" id="referenceValue" />
          <!-- <InputMask id="basic" v-model="value" mask="aa99999999999999999999999" placeholder="aa99999999999999999999999" /> -->
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
<script setup >
    import { ref } from 'vue'
    import InputNumber from 'primevue/inputnumber';
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';
    import axios from 'axios';
    import routes from '../../utils/routes.js';
    import { useUserStore } from '../../stores/user.js'


    const value = ref(0);
    const form = ref({
      referenceValue: '',
      paymentType: ''
    });

    const userStore = useUserStore()

    const paymentTypes = [
      { name: 'VCARD'},
      { name: 'MBWAY' },
      { name: 'PAYPAL' },
      { name: 'IBAN' },
      { name: 'MB' },
      { name: 'VISA' }
    ];

    const selectedType = ref(null);

    const submitForm = () => {
      axios.post(routes.transactions, {
        vcard: userStore.userId,
        type: 'D',
        value: value.value,
        payment_reference: form.value.referenceValue,
        payment_type: selectedType.value.name
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }



</script>
  
<style scoped>

  #ul{
    padding: 0;
  }

</style>
