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

export async function createCustomer(firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints){ // this works!
    const [result] = await pool.query(`INSERT INTO customers (firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [firstName, lastName, dob, dateJoined, phoneNumber, email, status, rewardPoints])
        return {
            customerID: result.insertId,
            firstName,
            lastName,
            dob,
            dateJoined,
            phoneNumber,
            email,
            status,
            rewardPoints
        }
}

export async function getIngredients(){
    const [rows] = await pool.query(`SELECT * FROM ingredients`)
    return rows
}

export async function getIngredient(ingredientID){
    const [ingredients] = await pool.query(`SELECT * FROM ingredients WHERE ingredientID = ?`, [ingredientID])
    return ingredients[0] ?? null
}

export async function createIngredient(ingredientID, _name, pricePerUnit, quantity){
    const [result] = await pool.query(`INSERT INTO ingredients (ingredientID, _name, pricePerUnit, quantity)
    VALUES (?, ?, ?, ?)`, [ingredientID, _name, pricePerUnit, quantity])
        return {
            ingredientID,
            _name,
            pricePerUnit,
            quantity
        }
}

export async function getPay_Periods(){
    const [rows] = await pool.query(`SELECT * FROM pay_periods`)
    return rows
}

export async function getPay_Period(payPeriodID){
    const [pay_periods] = await pool.query(`SELECT * FROM pay_periods WHERE payPeriodID = ?`, [payPeriodID])
    return pay_periods[0] ?? null
}

export async function createPay_Period(startDate, endDate){
    const [result] = await pool.query(`INSERT INTO pay_periods (startDate, endDate)
    VALUES (? ,?)`, [startDate, endDate])
        return {
            payPeriodID: result.insertId,
            startDate,
            endDate
        }
}

export async function getPayroll_Records(){
    const [payroll_records] = await pool.query(`SELECT * FROM payroll_records`)
    return payroll_records
}

export async function getPayroll_Record(employeeID, payPeriodID){
    const [payroll_records] = await pool.query(`SELECT * FROM payroll_records WHERE employeeID = ? AND payPeriodID = ?`, [employeeID, payPeriodID])
    return payroll_records[0] ?? null
}

export async function createPayroll_Record(employeeID, payPeriodID, totalHours, totalPay){
    const [result] = await pool.query(`INSERT INTO payroll_records (employeeID, payPeriodID, totalHours, totalPay)
        VALUES (?, ?, ?, ?)`, [employeeID, payPeriodID, totalHours, totalPay])
            return {
                employeeID,
                payPeriodID,
                totalHours,
                totalPay
            }
}

export async function getPrinters(){
    const [rows] = await pool.query(`SELECT * FROM printers`)
    return rows
}

export async function getPrinter(stationID){
    const [printers] = await pool.query(`SELECT * FROM printers WHERE stationID = ?`, [stationID])
    return printers[0] ?? null
}

export async function createPrinter(stationID){ 
    const [result] = await pool.query(`INSERT INTO printers (stationID)
        VALUES (?)`, [stationID])
        return {
            stationID: result.insertId
        }
}

export async function getProduct_Orders(){
    const [rows] = await pool.query(`SELECT * FROM product_orders`)
    return rows
}

export async function getProduct_Order(transactionID, productID){
    const [product_orders] = await pool.query(`SELECT * FROM product_orders WHERE transactionID = ? AND productID = ?`, [transactionID, productID])
    return product_orders[0] ?? null
}

export async function createProduct_Order(quantity, productID, transactionID){
    const [result] = await pool.query(`INSERT INTO product_orders (quantity, productID, transactionID)
        VALUES (?, ?, ?)`, [quantity, productID, transactionID])
            return {
                quantity,
                productID,
                transactionID
            }
}

export async function getProducts(){
    const [rows] = await pool.query(`SELECT * FROM products`)
    return rows
}

export async function getProduct(productID){
    const [products] = await pool.query(`SELECT * FROM products WHERE productID = ?`, [productID])
    return products[0] ?? null
}

export async function createProduct(productID, _name, price, menuType, isAvailable, stationID){ // we need to change stationID to stationType, no foreign key required
    const [result] = await pool.query(`INSERT INTO products (productID, _name, price, menuType, isAvailable, stationID)
    VALUES (?, ?, ?, ?, ?, ?)`, [productID, _name, price, menuType, isAvailable, stationID])
        return {
            productID,
            _name,
            price,
            menuType,
            isAvailable,
            stationID
        }
}

export async function getPurchase_Orders(){
    const [rows] = await pool.query(`SELECT * FROM purchase_orders`)
    return rows
}

export async function getPurchase_Order(orderID){
    const [purchase_orders] = await pool.query(`SELECT * FROM purchase_orders WHERE orderID = ?`, [orderID])
    return purchase_orders[0] ?? null
}

export async function createPurchase_Order(supplierName, ingredientID, quantity, dateOrdered){ // i think we need a foreign key for ingredientID here
    const [result] = await pool.query(`INSERT INTO purchase_orders (supplierName, ingredientID, quantity, dateOrdered)
    VALUES (?, ?, ?, ?)`, [supplierName, ingredientID, quantity, dateOrdered])
    return{
        orderID: result.insertId,
        supplierName,
        ingredientID,
        quantity,
        dateOrdered
    }
}

export async function getRecipes(){
    const [rows] = await pool.query(`SELECT * FROM recipes`)
    return rows
}

export async function getRecipe(recipeID){
    const [recipes] = await pool.query(`SELECT * FROM recipes WHERE recipeID = ?`, [recipeID])
    return recipes[0] ?? null
}

export async function createRecipe(recipeID, ingredientID, finishedProductID, intermediateProductID){ // foreign keys
    const [result] = await pool.query(`INSERT INTO recipes (recipeID, ingredientID, finishedProductID, intermediateProductID)
        VALUES (?, ?, ?, ?)`, [recipeID, ingredientID, finishedProductID, intermediateProductID])
        return{
            recipeID,
            ingredientID,
            finishedProductID,
            intermediateProductID
        }
}

export async function getScheduled_Shift(){
    const [rows] = await pool.query(`SELECT * FROM scheduled_shifts`)
    return rows
}

export async function getScheduled_Shifts(scheduledShiftID){
    const [scheduled_shift] = await pool.query(`SELECT * FROM scheduled_shifts WHERE scheduledShiftID = ?`, [scheduledShiftID])
    return scheduled_shift[0] ?? null
}

export async function createScheduled_Shift(startTime, endTime, shiftRole){
    const [result] = await pool.query(`INSERT INTO scheduled_shifts (startTime, endTime, shiftRole)
    VALUES (?, ?, ?)`, [startTime, endTime, shiftRole])
        return {
            scheduledShiftID: result.insertId,
            startTime,
            endTime,
            shiftRole
        }
}

export async function getSection(){
    const [rows] = await pool.query(`SELECT * FROM sections`)
    return rows
}

export async function getSections(sectionID){
    const [sections] = await pool.query(`SELECT * FROM sections WHERE sectionID = ?`, [sectionID])
    return sections[0] ?? null
}

export async function createSection(employeeID){
    const [result] = await pool.query(`INSERT INTO sections (employeeID)
    VALUES (?)`, [employeeID])
        return {
            sectionID: result.insertId,
            employeeID
        }
}

export async function getTables(){
    const [rows] = await pool.query(`SELECT * FROM tables`)
    return rows
}

export async function getTable(tableID){
    const [tables] = await pool.query(`SELECT * FROM tables WHERE tableID = ?`, [tableID])
    return tables[0] ?? null
}

export async function createTable(capacity, sectionID){
    const [result] = await pool.query(`INSERT INTO tables (capacity, sectionID)
    VALUES (?, ?)`, [capacity, sectionID])
        return {
            tableID: result.insertId,
            capacity,
            sectionID
        }
}

export async function getTimeclock_Entries(){
    const [rows] = await pool.query(`SELECT * FROM timeclock_entries`)
    return rows
}

export async function getTimeclock_Entry(entryID){
    const [timeclock_entries] = await pool.query(`SELECT * FROM timeclock_entries WHERE entryID = ?`, [entryID])
    return timeclock_entries[0] ?? null
}

export async function createTimeclock_Entry(clockIn, clockOUT, payPeriodID, employeeID, scheduledShiftID){
    const [result] = await pool.query(`INSERT INTO timeclock_entries (clockIn, clockOUT, payPeriodID, employeeID, scheduledShiftID)
    VALUES (?, ?, ?, ?, ?)`, [clockIn, clockOUT, payPeriodID, employeeID, scheduledShiftID])
    return {
        entryID: result.insertId,
        clockIn,
        clockOUT,
        payPeriodID,
        employeeID,
        scheduledShiftID
    }
}

export async function getTransactions(){
    const [rows] = await pool.query(`SELECT * FROM transactions`)
    return rows
}

export async function getTransaction(transactionID){
    const [transactions] = await pool.query(`SELECT * FROM transactions WHERE transactionID = ?`, [transactionID])
    return transactions[0] ?? null
}

export async function createTransaction(tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod){
    const [result] = await pool.query(`INSERT INTO transactions (tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [tableID, employeeID, customerID, timePlaced, total, tipAmount, paymentMethod])
        return {
            transactionID: result.insertId,
            tableID,
            employeeID,
            customerID,
            timePlaced,
            total,
            tipAmount,
            paymentMethod
        }
}

export async function getItemsSoldReport(startDate, endDate) {
    const [result] = await pool.query(
        `SELECT
            p._name AS productName,
            p.price,
            SUM(po.quantity) AS totalQuantitySold,
            SUM(po.quantity * p.price) AS totalRevenue
        FROM product_orders po
        JOIN products p ON po.productID = p.productID
        JOIN transactions t ON po.transactionID = t.transactionID
        WHERE t.timePlaced BETWEEN ? AND ?
        GROUP BY p.productID, p._name, p.price
        ORDER BY totalQuantitySold DESC`, [startDate, endDate])
        return result[0] ?? null
}

export async function getRevenue_Summary(startDate, endDate){
    const [rows] = await pool.query(
        `SELECT
            COUNT(t.transactionID) AS numberOfTransactions,
            SUM(t.total) AS totalRevenue,
            SUM(COALESCE(t.tipAmount, 0)) AS totalTips,
            AVG(t.total) AS averageTransactionValue
        FROM transactions t
        JOIN employees e ON t.employeeID = e.employeeID
        WHERE t.timePlaced BETWEEN ? AND ?`,
        [startDate, endDate])
    return rows[0] ?? null
}

export async function getRevenueBy_Employee(startDate, endDate){
    const [rows] = await pool.query(
        `SELECT
            e.firstName,
            e.lastName,
            COUNT(t.transactionID) AS transactionsHandled,
            SUM(t.total) AS revenue,
            SUM(COALESCE(t.tipAmount, 0)) AS tips
        FROM transactions t
        JOIN employees e ON t.employeeID = e.employeeID
        WHERE t.timePlaced BETWEEN ? AND ?
        GROUP BY e.employeeID, e.firstName, e.lastName
        ORDER BY revenue DESC`,
        [startDate, endDate])
    return rows
}