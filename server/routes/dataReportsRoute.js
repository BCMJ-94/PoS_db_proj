import express from 'express'
import { getItemsSoldReport } from '../database.js'
import isAuthorized from '../utils/auth.js'

const dataReportsRouter = express.Router()
dataReportsRouter.use(isAuthorized)

dataReportsRouter.get('/items-sold', async (req, res) => {
    const { startDate, endDate } = req.query
    try {
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'A start and end date are required' })
        }
        const rows = await getItemsSoldReport(startDate, endDate)
        res.json(rows)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default dataReportsRouter