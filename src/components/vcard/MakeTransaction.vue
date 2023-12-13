<template>
    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="transactionValue">Transaction Value</label>
          <InputNumber v-model="value2" inputId="currency-germany" mode="currency" currency="EUR" locale="de-DE" />
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


    const value2 = ref(0);
    const form = ref({
      referenceValue: '',
      paymentType: ''
    });

    const paymentTypes = [
      { name: 'MBWAY' },
      { name: 'PAYPAL' },
      { name: 'IBAN' },
      { name: 'MB' },
      { name: 'VISA' }
    ];

    const selectedType = ref(null);


    const submitForm = () => {
    
    }



</script>
  
<style scoped>

</style>
