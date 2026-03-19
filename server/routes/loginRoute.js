import express from 'express'
import { compare } from 'bcrypt'

import { getEmployeeCredentials } from '../database.js'


const loginRouter = express.Router()

loginRouter.post('/login', async (req, res) => {
    const { employeeID, password } = req.body

    try {
        if (!employeeID || !password) {
            return res.status(400).json({
                message: "Fields not entered"
            })
        }
        
        const employee = await getEmployeeCredentials(employeeID)
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            })
        }
        
        const match = await compare(password, employee.hashedPassword)
        if (!match) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        req.session.employee = {
            employeeID : employee.employeeID
        }

        res.status(200).json(req.session.employee)
        
    } catch(err) {
        res.status(500).json({
            message: "Server error"
        })
    }

})



export default loginRouter