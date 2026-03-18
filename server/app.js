import { hash, compare } from 'bcrypt'
import express from 'express'
import cors from 'cors'

import { getEmployees, getEmployee, createEmployee, getEmployeeCredentials } from './database.js'

const app = express()
const port = 3030

const corsOptions = { 
    origin: "http://localhost:5173/", 
    credentials: true,
}

app.use(express.json())
app.use(cors(corsOptions))

app.post('/login', async (req, res) => {
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

        // Send session | Implement later
        res.json(employee)
        
    } catch(err) {
        res.status(500).json({
            message: "Server error"
        })
    }

})

app.get("/employees", async (req, res) => { // creates a route /employees on the webapp that displays the list of employees
    try {
        const employees = await getEmployees() // make sure async is present so that await works
        res.json(employees)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

app.get("/employee/:employeeID", async (req, res) => { // creates a route /employees/id that shows a given employee
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

app.post("/employees", async (req, res) => { // creates a new employee using the createEmployee function from database.js and adds it to the /employees path (where the list of employees are)
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

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})