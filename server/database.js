// has database functions stored here
import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getEmployees(){ // exporting allows it to be used in different files (like app.js)
    const [rows] = await pool.query("SELECT * FROM employees")
    return rows
}

export async function getEmployeeCredentials(employeeID) {
    const [employee] = await pool.query(`SELECT employeeID, hashedPassword FROM employees WHERE employeeID = ?`, [employeeID])
    return employee[0] ?? null
}

export async function getEmployee(employeeID){
    const [employee] = await pool.query(`SELECT * FROM employees WHERE employeeID = ?`, [employeeID]) // we send the [id] separately to the query, mySQL will manage it and make sure the untrusted data (the ?) isn't a part of the query
    return employee[0] ?? null
}

export async function createEmployee(firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword){
    const [result] = await pool.query(`INSERT INTO employees (firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, hashedPassword])
    return {
        employeeID: result.insertId,
        firstName,
        lastName,
        dateHired,
        dateOfBirth,
        shiftRole,
        hourlyRate,
        hashedPassword
    }
}
