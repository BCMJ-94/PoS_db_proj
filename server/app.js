import { getEmployees } from './database.js'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3030

const corsOptions = { 
    origin: "http://localhost:5173/", 
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.get("/employees", async (req, res) => { // creates a route /employees on the webapp that displays the list of employees
    const employees = await getEmployees() // make sure async is present so that await works
    res.send(employees)

})

app.get("/employee/:employeeID", async (req, res) => { // creates a route /employees/id that shows a given employee
    const employeeID = req.params.employeeID
    const employee = await getEmployee(employeeID)
    res.send(employee)
})

app.post("/employees", async (req, res) => { // creates a new employee using the createEmployee function from database.js and adds it to the /employees path (where the list of employees are)
    const {firstName, lastName, dateHired, dateOfBirth, ShiftRole, hourlyRate} = req.body
    const employee = await createEmployee(firstName, lastName, dateHired, dateOfBirth, ShiftRole, hourlyRate)
    //res.status(201).send(note)
})

// error handling?

app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})