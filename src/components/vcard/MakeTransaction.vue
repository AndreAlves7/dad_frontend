<template>
  <div class="container">
      <div class="row">
        <div class="mt-3">
            <h2>Make a Transaction</h2>
            <hr>
        </div>
  <div class="card bg-light p-3">
            <div class="mb-2">

    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="form-group custom-margin">
          <label for="transactionValue">Transaction Value</label>
          <InputNumber v-model="value" inputId="currency-germany" mode="currency" currency="EUR" locale="de-DE" style="margin-left: 40px ;" />
        </div>
        <div class="form-group custom-margin">
          <label for="paymentType">Payment Type</label>
          <Dropdown v-model="selectedType" :options="paymentTypes" optionLabel="name" placeholder="Payment Type" class="w-full" style="margin-left: 61px ;" />
        </div>
        <div class="form-group custom-margin">
          <label for="paymentType">Reference </label>
          <InputText v-model="form.referenceValue" id="referenceValue" style="margin-left: 85px ;" />
        </div>
        <div class = "custom-margin">
          <label for="category">Category</label>
          <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="Category" class="w-full" style="margin-left: 90px ;" />
        </div>
        <div class = "custom-margin">
          <label for="description">Description</label>
          <InputText v-model="form.description" id="description" style="margin-left: 76px ;" />
        </div>

        <br>        
        <button type="submit" class="btn btn-primary btn-submit">
          Submit
        </button>
      </form>

      <div v-if="errors.length > 0">
        <h4>Errors</h4>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
<script setup >
    import { ref, onMounted } from 'vue'
    import InputNumber from 'primevue/inputnumber';
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';
    import axios from 'axios';
    import routes from '../../utils/routes.js';
    import { useUserStore } from '../../stores/user.js'
    import { useToast } from "vue-toastification"


    const toast = useToast()
    const value = ref(0);
    const form = ref({
      referenceValue: '',
      paymentType: '',
      description: ''
    });
    const categories = ref([]);
    const selectedCategory = ref(null);

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
    const errors  = ref([]);

    const submitForm = () => {
      errors.value = []
      //validate 
      const invalid = validatePaymentRef(selectedType.value.name, form.value.referenceValue)
      if(invalid){
        errors.value.push(invalid)
        return toast.error(invalid)
      }


      axios.post(routes.transactions, {
        vcard: userStore.userId,
        type: 'D',
        value: value.value,
        payment_reference: form.value.referenceValue,
        payment_type: selectedType.value.name,
        category_id: selectedCategory.value.id,
        description: form.value.description
      })
        .then(function (response) {
          console.log(response);
          toast.success('Transaction created successfully!')
        })
        .catch(function (error) {
          console.log(error);
        });
    }



    function validatePaymentRef(selectedPaymentType, paymentReference){
      console.log(selectedPaymentType)
      console.log(paymentReference)
    switch(selectedPaymentType){
      case 'MBWAY':
        if(!paymentReference.match(/^9[0-9]{8}$/)) {
          return "The MBWAY payment reference must have 9 digits"
        }
        break;
      case 'PAYPAL':
        if(!paymentReference.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
         return "The PayPal payment reference is not valid"
        }
        break;
      case 'IBAN':
        if(!paymentReference.match(/^[A-Z]{2}[0-9]{23}$/)) {
          return "The payment reference must have 2 letters and 23 digits"
        }
        break;
      case 'MB':
        if(!paymentReference.match(/^[0-9]{9}$/)) {
          return "The payment reference must have 9 digits"
        }
        break;
      case 'VISA':
        if(!paymentReference.match(/^[0-9]{9}$/)) {
          return "The payment reference must have 9 digits"
        }
        break;
      }
      return false;
  }



  const getCategories = () => {
    axios.get(`${routes.categories}/${userStore.userId}`)
      .then(function (response) {
        console.log(response);
        const { data }  = response
        const categoriesFiltered = data.filter(category => category.type === 'D')

        categories.value = categoriesFiltered
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onMounted(() => {
    getCategories()
  })


</script>
  
<style scoped>
.btn-submit {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-submit:hover {
  background-color: #18125f; 
  color: #fff; 
}
.custom-margin {
  margin-bottom: 15px; 
}
</style>
