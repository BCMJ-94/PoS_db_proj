import express from 'express'

import { getTransaction, getTransactions, createTransaction, updateTransaction, deleteTransaction, getCurrentTransactionIDByTable, createProduct_Order, openTransactionTab, closeTransactionTab, getCustomerID } from '../database.js'
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
            return res.status(404).json({
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

transactionsRouter.put("/", async (req, res) => {
    const {tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod, transactionID} = req.body

    try {
        const trans = await updateTransaction(tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod, transactionID)
        res.status(201).send(trans)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.delete("/", async (req, res) => {
    const { transactionID } = req.body

    try {
        await deleteTransaction(transactionID)
        res.sendStatus(204)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

transactionsRouter.post("/openTab", async (req, res) => { // this successfully opens a transaction (tab)
        try{

            // creates the transaction
            const {tableID} = req.body
            const employeeID = req.session.employee.employeeID
            await openTransactionTab(tableID, employeeID)

            res.status(201).json({
                message: "Transaction successfully created"
            })

        } catch (err) {
            res.status(500).json({
                message: "Transaction creation failed"
            })
        }
    })

    transactionsRouter.post("/addOrder", async (req, res) => {
        try{
            const {quantity, productID, tableID} = req.body
            const transID = await getCurrentTransactionIDByTable(tableID)
            await createProduct_Order(quantity, productID, transID)

            res.status(201).json({
                message: "Order sucessfully added to transaction"
            })

        } catch (err) {
            res.status(500).json({
                message: "Failed to add order to transaction"
            })

        }
    })

transactionsRouter.put("/modifyOrder", async (req, res) => {
    try {
        const { quantity, productID, tableID } = req.body
        const transID = await getCurrentTransactionByTable(tableID)
        await updateProduct_Order(quantity, productID, transID)
        res.status(200).json({
            message: "Order successfully updated"
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to update order"
        })
    }
})

transactionsRouter.delete("/deleteOrder", async (req, res) => {
    try {
        const { productID, tableID } = req.body
        const transID = await getCurrentTransactionByTable(tableID)
        await deleteProduct_Order(transID, productID)
        res.status(200).json({
            message: "Order successfully removed"
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to remove order"
        })
    }
})


transactionsRouter.put("/closeTab", async (req, res) => {
        try{
            // first we need to grab the employeeID and the correct transaction for that employee
            const {employeeID, tableID, email, total, tipAmount, paymentMethod} = req.body
            // const employeeID = req.session.employee.employeeID
            const transID = await getCurrentTransactionIDByTable(tableID)
            // then we need to add the rest of the attributes
            // server is supposed to receive customer email to find the customerID if registered
            if(!email){
                await closeTransactionTab(total, tipAmount, paymentMethod, employeeID, transID, tableID)
            }
            const customer = await getCustomerID(email)

            // else if(email){

            // }
            // if(!customer){
            //     await closeTransactionTab(total, tipAmount, paymentMethod, employeeID, transID, tableID)
            // }
            // else{ // if not null, find customerID associated with given email and add reward points
            //     // update customer in loyalty program with points (one dollar is one point)
            //     // close tab
            //     //await closeTabWithEmail(employeeID, custID, transID, tableID, total, tipAmount, paymentMethod)
            //     console.log("Entering branch")

            // }
            // once customerID is found, the server is supposed to attach the found ID to the transaction
            res.status(201).json({
                message: "Successfully closed transaction"
            })
        } catch (err) {
            res.status(500).json({
                message: "Failed to close transaction"
            })
        }
    })

export default transactionsRouter