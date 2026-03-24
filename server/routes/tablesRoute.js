import express from 'express'

import { getTable, getTables, createTable } from '../database.js'
import isAuthorized from '../utils/auth.js'

const tablesRouter = express.Router()

tablesRouter.use(isAuthorized)

tablesRouter.get("/", async (req, res) => {
    try {
        const tables = await getTables()
        res.json(tables)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.get("/:tableID", async (req, res) => {
    const tableID = req.params.tableID
    try {
        const table = await getTable(tableID)

        if (!table) {
            res.status(404).json({
                message: "Table not found"
            })
        }

        res.send(table)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

tablesRouter.post("/", async (req, res) => {
    const { capacity, sectionID } = req.body

    try {
        const table = await createTable(capacity, sectionID)
        res.status(201).send(table)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default tablesRouter