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

export async function getCustomers(){ // exporting allows it to be used in different files (like app.js)
    const [rows] = await pool.query("SELECT * FROM customers")
    return rows
}

export async function getIngredients(){
    const [rows] = await pool.query(`SELECT * FROM ingredients`)
    return rows
}

export async function getPay_Periods(){
    const [rows] = await pool.query(`SELECT * FROM pay_periods`)
    return rows
}

export async function getPayroll_Records(){
    const [payroll_records] = await pool.query(`SELECT * FROM payroll_records`)
    return payroll_records
}

export async function getPrinters(){
    const [rows] = await pool.query(`SELECT * FROM printers`)
    return rows
}

export async function getProduct_Orders(){
    const [rows] = await pool.query(`SELECT * FROM product_orders`)
    return rows
}

export async function getProducts(){
    const [rows] = await pool.query(`SELECT * FROM products`)
    return rows
}

export async function getPurchase_Orders(){
    const [rows] = await pool.query(`SELECT * FROM purchase_orders`)
    return rows
}

export async function getRecipes(){
    const [rows] = await pool.query(`SELECT * FROM recipes`)
    return rows
}

export async function getScheduled_Shift(){
    const [rows] = await pool.query(`SELECT * FROM scheduled_shifts`)
    return rows
}

export async function getSection(){
    const [rows] = await pool.query(`SELECT * FROM sections`)
    return rows
}

export async function getTables(){
    const [rows] = await pool.query(`SELECT * FROM tables`)
    return rows
}

export async function getTimeclock_Entries(){
    const [rows] = await pool.query(`SELECT * FROM timeclock_entries`)
    return rows
}

export async function getTransactions(){
    const [rows] = await pool.query(`SELECT * FROM transactions`)
    return rows
}