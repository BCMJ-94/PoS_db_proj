import express from 'express'

import { getTransaction, getTransactions, createTransaction } from '../database.js'
import isAuthorized from '../utils/auth.js'

const transactionsRouter = express.Router()

transactionsRouter.use(isAuthorized)

transactionsRouter.get("/", async (req, res) => {
    try {
        const transactions = await getTransactions()
        res.json(transactions)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.get("/:transactionID", async (req, res) => {
    const transactionID = req.params.transactionID
    try {
        const transaction = await getTransaction(transactionID)

        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found"
            })
        }

        res.send(transaction)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.post("/", async (req, res) => {
    const { tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod } = req.body

    try {
        const transaction = await createTransaction(tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod)
        res.status(201).send(transaction)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default transactionsRouter