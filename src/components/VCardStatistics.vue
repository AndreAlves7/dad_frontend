<script setup>
import VCardChartAmountByTime from './VCardChartAmountByTime.vue';
import VCardChartPaymentType from './VCardChartPaymentType.vue';
import VCardChartAmountTotals from './VCardChartAmountTotals.vue';
import { ref, onMounted } from 'vue';

const isChartVisible = ref(true);


</script>

<template>
  <div class="w-75 h-30rem container">
    <div class="row align-items-center">
      <div class="col-12 mt-3">
        <div class="mb-3">
          <h2>VCard Statistics</h2>
          <hr />
        </div>
      </div>
      <div class="col-lg-4 mt-3" style="margin-left: 100px;">
        <VCardChartAmountTotals v-if="isChartVisible" />
      </div>
      <div class="col-lg-4 mt-3" style="margin-left: 150px;">
        <VCardChartPaymentType v-if="isChartVisible" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <VCardChartAmountByTime v-if="isChartVisible" />
      </div>
    </div>
    <br>
    <br>
  </div>
</template>



