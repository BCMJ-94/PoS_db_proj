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

export async function getCustomer(customerID){
    const [customers] = await pool.query(`SELECT * FROM customers WHERE customerID = ?`, [customerID])
    return customers[0] ?? null
}

export async function getCustomer_Email(email){
    const [customers] = await pool.query(`SELECT * FROM customers WHERE email = ?`, [email])
    return customers[0] ?? null
}

export async function getIngredients(){
    const [rows] = await pool.query(`SELECT * FROM ingredients`)
    return rows
}

export async function getIngredient(ingredientID){
    const [ingredients] = await pool.query(`SELECT * FROM ingredients WHERE ingredientID = ?`, [ingredientID])
    return ingredients[0] ?? null
}

export async function getPay_Periods(){
    const [rows] = await pool.query(`SELECT * FROM pay_periods`)
    return rows
}

export async function getPay_Period(payPeriodID){
    const [pay_periods] = await pool.query(`SELECT * FROM pay_periods WHERE payPeriodID = ?`, [payPeriodID])
    return pay_periods[0] ?? null
}

export async function getPayroll_Records(){
    const [payroll_records] = await pool.query(`SELECT * FROM payroll_records`)
    return payroll_records
}

export async function getPayroll_Record(employeeID, payPeriodID){
    const [payroll_records] = await pool.query(`SELECT * FROM payroll_records WHERE employeeID = ? AND payPeriodID = ?`, [employeeID, payPeriodID])
    return payroll_records[0] ?? null
}

export async function getPrinters(){
    const [rows] = await pool.query(`SELECT * FROM printers`)
    return rows
}

export async function getPrinter(stationID){
    const [printers] = await pool.query(`SELECT * FROM printers WHERE stationID = ?`, [stationID])
    return printers[0] ?? null
}

export async function getProduct_Orders(){
    const [rows] = await pool.query(`SELECT * FROM product_orders`)
    return rows
}

export async function getProduct_Order(transactionID, productID){
    const [product_orders] = await pool.query(`SELECT * FROM product_orders WHERE transactionID = ? AND productID = ?`, [transactionID, productID])
    return product_orders[0] ?? null
}

export async function getProducts(){
    const [rows] = await pool.query(`SELECT * FROM products`)
    return rows
}

export async function getProduct(productID){
    const [products] = await pool.query(`SELECT * FROM products WHERE productID = ?`, [productID])
    return products[0] ?? null
}

export async function getPurchase_Orders(){
    const [rows] = await pool.query(`SELECT * FROM purchase_orders`)
    return rows
}

export async function getPurchase_Order(orderID){
    const [purchase_orders] = await pool.query(`SELECT * FROM purchase_orders WHERE orderID = ?`, [orderID])
    return purchase_orders[0] ?? null
}

export async function getRecipes(){
    const [rows] = await pool.query(`SELECT * FROM recipes`)
    return rows
}

export async function getRecipe(recipeID){
    const [recipes] = await pool.query(`SELECT * FROM recipes WHERE recipeID = ?`, [recipeID])
    return recipes[0] ?? null
}

export async function getScheduled_Shift(){
    const [rows] = await pool.query(`SELECT * FROM scheduled_shifts`)
    return rows
}

export async function getScheduled_Shifts(scheduledShiftID){
    const [scheduled_shift] = await pool.query(`SELECT * FROM scheduled_shifts WHERE scheduledShiftID = ?`, [scheduledShiftID])
    return scheduled_shift[0] ?? null
}

export async function getSection(){
    const [rows] = await pool.query(`SELECT * FROM sections`)
    return rows
}

export async function getSections(sectionID){
    const [sections] = await pool.query(`SELECT * FROM sections WHERE sectionID = ?`, [sectionID])
    return sections[0] ?? null
}

export async function getTables(){
    const [rows] = await pool.query(`SELECT * FROM tables`)
    return rows
}

export async function getTable(tableID){
    const [tables] = await pool.query(`SELECT * FROM tables WHERE tableID = ?`, [tableID])
    return tables[0] ?? null
}

export async function getTimeclock_Entries(){
    const [rows] = await pool.query(`SELECT * FROM timeclock_entries`)
    return rows
}

export async function getTimeclock_Entry(entryID){
    const [timeclock_entries] = await pool.query(`SELECT * FROM timeclock_entries WHERE entryID = ?`, [entryID])
    return timeclock_entries[0] ?? null
}

export async function getTransactions(){
    const [rows] = await pool.query(`SELECT * FROM transactions`)
    return rows
}

export async function getTransaction(transactionID){
    const [transactions] = await pool.query(`SELECT * FROM transactions WHERE transactionID = ?`, [transactionID])
    return transactions[0] ?? null
}