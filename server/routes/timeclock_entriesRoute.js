import express from 'express'

import { getTimeclock_Entry, getTimeclock_Entries, createTimeclock_Entry } from '../database.js'
import isAuthorized from '../utils/auth.js'

const timeclock_entriesRouter = express.Router()

timeclock_entriesRouter.use(isAuthorized)

timeclock_entriesRouter.get("/", async (req, res) => {
    try {
        const entries = await getTimeclock_Entries()
        res.json(entries)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

timeclock_entriesRouter.get("/:entryID", async (req, res) => {
    const entryID = req.params.entryID
    try {
        const entry = await getTimeclock_Entry(entryID)

        if (!entry) {
            res.status(404).json({
                message: "Entry not found"
            })
        }

        res.send(entry)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

timeclock_entriesRouter.post("/", async (req, res) => {
    const { clockIn, clockOUT, payPeriodID, employeeID, scheduledShiftID } = req.body

    try {
        const entry = await createTimeclock_Entry(clockIn, clockOUT, payPeriodID, employeeID, scheduledShiftID)
        res.status(201).send(entry)
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default timeclock_entriesRouter