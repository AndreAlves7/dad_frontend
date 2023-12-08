  <script setup>
import axios from 'axios';
import {watch, ref, inject } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useToast } from "vue-toastification"

const toast = useToast()
const userStore = useUserStore()
const { showProfilePopup } = defineProps(['showProfilePopup']);
const emit = defineEmits(['close-popup'])
const showConfirmPopup = ref(false);
const errors = ref([])

const formData = ref({
  name: '',
  email: '',
  confirmation_code: '',
  password: '',
  photo_url: '',
});
const clearFormData = () => {
  Object.assign(formData.value, {
    name: '',
    email: '',
    confirmation_code: '',
    password: '',
    photo_url: null,
  });
  password.value = ''
};

const password = ref(null)

  const closePopup = () => {
    emit('close-popup');
};

  const closeConfirmPopup = () => {
    showConfirmPopup.value = false
  }

const handleFileChange = (event) => {
  const file = event.target.files[0];
  formData.value.photo_url = file;
};


const isValidInputs = () => {
    let isValid = true
    errors.value = {}
    if(formData.value.confirmation_code.length !== 0 && formData.value.confirmation_code.length < 3) {
        errors.value['pin'] = ['Pin must have at least 3 digits!']
        isValid = false
    }
    
    return isValid
}

const submitForm = async () => {
  
  //Verify confirm password
    if(((formData.value.password != null && formData.value.password != "") 
        || (formData.value.confirmation_code != null) && formData.value.confirmation_code != "")){
        showConfirmPopup.value = true
        closePopup()
        return;
    }else{
      sendData()
     }
    }

const confirmPassword = async () => {
  try{
      await axios.post('me/confirmPassword', {password:password.value})
      sendData()
      closeConfirmPopup()
      }catch(error){
        toast.error(error.response.data.msg)
        return;
      }
}

const sendData = async () => {
  try {
    console.log(formData)
        if(isValidInputs()){
            await axios.patch('/me', formData.value)
            toast.success('User data correctly Updated!')

            clearFormData()
            closePopup()
            userStore.loadUser();
        } else {
        const allErrorMessages = Object.values(errors.value)
            .reduce((acc, messages) => acc.concat(messages), []);

        toast.error(`User data is invalid! Errors: ${allErrorMessages.join(', ')}`);
        }
    } catch(error) {  
      toast.error(error.response.data.message)
    }
}
</script>


<template>
    <div v-if="showProfilePopup" class="popup">
      <button type="button" class="btn btn-outline-secondary close-button" aria-label="Close" @click="closePopup">
        <span aria-hidden="true">&times;</span>
      </button>
  
      <h2 class="mb-4">Update User</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="formData.name" type="text" class="form-control" id="name" :placeholder="userStore.user.name">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="formData.email" type="email" class="form-control" id="email" :placeholder="userStore.user.email">
        </div>
        <div class="form-group">
          <label for="confirmation_code">Confirmation Code:</label>
          <input v-model="formData.confirmation_code" type="text" class="form-control" id="confirmation_code" placeholder="Enter confirmation code">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Enter your password">
        </div>
        
        <div class="mb-3">
          <label for="formFileSm" class="form-label">Profile Photo</label>
          <input v-on:change="handleFileChange" class="form-control form-control-sm" id="formFileSm" type="file">
        </div>
      
        <div class="submit-div">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>  
      
      </form>
    </div>

    <div v-if="showConfirmPopup" class="popup">
      <button type="button" class="btn btn-outline-secondary close-button" aria-label="Close" @click="closeConfirmPopup">
          <span aria-hidden="true">&times;</span>
        </button>

      <form @submit.prevent="confirmPassword">
        <h2 class="mb-4">Confirm password</h2>


          <div class="submit-div">
            <button type="submit" class="btn btn-primary">Submit</button>

            <div class="form-group" style="padding-left: 15px; ">
            <input v-model="password" type="password" class="form-control" id="confirmPass" placeholder="Confirm your password">
          </div>
          
        </div>
      </form>
    </div>
  </template>

<style scoped>
/* Custom styles for the popup */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
}   

.close-button.btn {
  background-color: #007bff;
  border-color: #007bff; 
  color: #fff; 
}

.close-button.btn:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.submit-div {
  display: flex;
  flex-direction: row !important;
}
</style>