import express from 'express'
import { getItemsSoldReport, getRevenue_Summary, getRevenueBy_Employee } from '../database.js'
import isAuthorized from '../utils/auth.js'

const dataReportsRouter = express.Router()
dataReportsRouter.use(isAuthorized)

dataReportsRouter.get('/revenue', async (req, res) => {
    const { start, end } = req.query

    try {
        if (!start || !end) {
            return res.status(400).json({
                message: "Start and end dates required"
            })
        }

        const startDate = `${start} 00:00:00`
        const endDate = `${end} 23:59:59`

        const summary = await getRevenue_Summary(startDate, endDate)
        const byEmployee = await getRevenueBy_Employee(startDate, endDate)

        res.status(200).json({
            summary,
            byEmployee
        })
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default dataReportsRouter