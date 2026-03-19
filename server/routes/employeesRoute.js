import express from 'express'
import { hash } from 'bcrypt'

import { getEmployee, getEmployees, createEmployee } from '../database.js'
import isAuthorized from '../utils/auth.js'

const employeesRouter = express.Router()
employeesRouter.use(isAuthorized)
employeesRouter.get("/", async (req, res) => {
    try {
        const employees = await getEmployees() 
        res.json(employees)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

employeesRouter.get("/:employeeID", async (req, res) => { 
    const employeeID = req.params.employeeID
    try {
        const employee = await getEmployee(employeeID)

        if (!employee) {
            res.status(404).json({
                message: "Employee not found"
            })
        }

        res.send(employee)
    } catch(err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

employeesRouter.post("/", async (req, res) => { 
    const {firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, password} = req.body

    try {

        const saltRounds = 10
        const hashedPassword = await hash(password, saltRounds)
        const employee = await createEmployee(firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword)
        res.status(201).send(employee)

    } catch(err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default employeesRouter