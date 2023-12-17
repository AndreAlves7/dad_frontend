<script setup>
import { ref, onMounted } from 'vue'
import CategoriesTable from './CategoriesTable.vue'
import { useVcardsStore } from "../../stores/vcard.js"

const categories = ref({})
const vcardsStore = useVcardsStore()

const loadVcards = async () => {
    try {
        categories.value = await vcardsStore.loadVcards()
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
        <div class="col-12">
          <h1>Categories</h1>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <router-link class="btn btn-primary" :to="{ name: 'category-create' }">Create</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>
                  <router-link class="btn btn-primary" :to="{ name: 'category-edit', params: { id: category.id } }">Edit</router-link>
                  <button class="btn btn-danger" @click="remove(category)">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>