<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/user.js';
import Chart from 'primevue/chart';

const userStore = useUserStore();
const transactions = ref([]);

const loadTransactions = async () => {
    try {
        await userStore.loadUser();
        const response = await axios.get('/vcard/statistics/' + userStore.user.id);
        transactions.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    loadTransactions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const dataForStatistics = transactions.value.data_for_statistics;

    if (!dataForStatistics || !Array.isArray(dataForStatistics)) {
        return {}; // Handle the case when data_for_statistics is not available or not an array
    }

    const documentStyle = getComputedStyle(document.documentElement);
    const uniqueMonths = [...new Set(dataForStatistics.map(item => item.month))];
    const creditData = [];
    const debitData = [];

    dataForStatistics.forEach(item => {
        const index = uniqueMonths.indexOf(item.month);
        

        if (!creditData[index]) {
            creditData[index] = 0;
        }

        if (!debitData[index]) {
            debitData[index] = 0;
        }


        if (item.type === 'C') {
            creditData[index] = item.sum_of_values;
        } else if (item.type === 'D') {
            debitData[index] = item.sum_of_values;
        }

        
    });

    return {
        labels: uniqueMonths,
        datasets: [
            {
                type: 'bar',
                label: 'Credit',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: creditData,
            },
            {
                type: 'bar',
                label: 'Debit',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: debitData,
            },
        ],
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: true,
        aspectRatio: 1.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                stacked: true,
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
        },
    };
};

</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-3">
                <div class="mb-3">
                    <h2>VCard Statistics</h2>
                    <hr />
                </div>
                <br>
                <h4> Total Transactions amount  by month and type</h4>
                <div class="card">
                    <Chart type="bar" :data="setChartData()" :options="setChartOptions()" class="h-30rem" />
                </div>
            </div>
        </div>
    </div>
</template>
