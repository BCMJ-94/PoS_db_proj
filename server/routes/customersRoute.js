import express from 'express'

import { getCustomer, getCustomers, createCustomer } from '../database.js'
import isAuthorized from '../utils/auth.js'

const customersRouter = express.Router()

customersRouter.use(isAuthorized)

customersRouter.get("/", async (req, res) => {
    try {
        const customers = await getCustomers()
        res.json(customers)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

customersRouter.get("/:customerID", async (req, res) => {
    const customerID = req.params.customerID
    try {
        const customer = await getCustomer(customerID)

        if (!customer) {
            res.status(404).json({
                message: "Customer not found"
            })
        }

        res.send(customer)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

customersRouter.post("/", async (req, res) => {
    const { firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints } = req.body

    try {
        const customer = await createCustomer(firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints)
        res.status(201).send(customer)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default customersRouter