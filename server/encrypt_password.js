import { hash } from 'bcrypt'
import { createEmployee } from "./database.js"
import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const password = "testpass"
const saltRounds = 10
const hashedPassword = await hash(password, saltRounds)
const result = await createEmployee("first", "last", "1994-01-01", "1994-01-01", "1", "30", hashedPassword)
