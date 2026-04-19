import express from 'express'
import { getItemsSoldReport } from '../database.js'
import isAuthorized from '../utils/auth.js'

const itemsSoldRouter = express.Router()

itemsSoldRouter.use(isAuthorized)

itemsSoldRouter.get('/', async (req, res) => {
    const { start, end } = req.query
    try {
        if (!start || !end) {
            return res.status(400).json({ message: 'Start and end dates required' })
        }
        const startDate = `${start} 00:00:00`
        const endDate = `${end} 23:59:59`

        const itemsSold = await getItemsSoldReport(startDate, endDate)

        res.status(200).json(itemsSold)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

export default itemsSoldRouter