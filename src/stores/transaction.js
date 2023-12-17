import { ref } from "vue"
import axios from "axios"
import { defineStore } from "pinia"
import routes from "../utils/routes.js"
import { useUserStore } from "./user.js"

export const useTransactionStore = defineStore('transactions', () => {

    const transactions = ref([])

    const userStore = useUserStore()


    async function createManualTransaction(newTransaction){
        newTransaction.type = 'C'

        const response = await axios.post(routes.transactions, newTransaction)
        return response.data.data
    }


    async function loadTransactions() {
        
        try {
            // await userStore.loadUser()
            // console.log(userStore.user)
            const response = await axios.get('/vcard/transaction/' + userStore.user.id)
            
            transactions.value = response.data.transactions
            // console.log(transactions.value)
        } catch (error) {
            console.log(error)
        }

    }

    return {
        createManualTransaction,
        loadTransactions,
        transactions
    }

})