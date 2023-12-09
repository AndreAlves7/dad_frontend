import { ref } from "vue"
import axios from "axios"
import { defineStore } from "pinia"
import routes from "../utils/routes.js"

export const useTransactionStore = defineStore('transactions', () => {

    async function createManualTransaction(newTransaction){
        newTransaction.type = 'C'

        const response = await axios.post(routes.transactions, newTransaction)
        return response.data.data
    }

    return {
        createManualTransaction,
    }

})