import express from 'express'
import { getItemsSoldReport, getRevenue_Summary, getRevenueBy_Employee, getTopSpenders, getTopVisitors  } from '../database.js'
import isAuthorized from '../utils/auth.js'

const dataReportsRouter = express.Router()
dataReportsRouter.use(isAuthorized)

dataReportsRouter.get('/revenue', async (req, res) => {
    const { start, end } = req.query
    try {
        if (!start || !end) {
            return res.status(400).json({ message: 'Start and end dates required' })
        }
        const startDate = `${start} 00:00:00`
        const endDate = `${end} 23:59:59`
        const summary = await getRevenue_Summary(startDate, endDate)
        const byEmployee = await getRevenueBy_Employee(startDate, endDate)
        res.status(200).json({ summary, byEmployee })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

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

dataReportsRouter.get('/top-spenders', async (req, res) => {
    try {
        const { startDate, endDate, limit } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start and end dates required' });
        }
        const parsedLimit = parseInt(limit, 10); // turns query string into base-10 integer
        const finalLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 // checks to see if its a whole number and above 0
            ? Math.min(parsedLimit, 100) : 10; // caps entries returned to 100 (if user enters 500, only top 100 will be showm)
        const result = await getTopSpenders(startDate, endDate, finalLimit);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get top spenders' });
    }
})

dataReportsRouter.get('/top-visitors', async (req, res) => {
    try {
        const { startDate, endDate, limit } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'Start and end dates required' });
        }
        const parsedLimit = parseInt(limit, 10); 
        const finalLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 
            ? Math.min(parsedLimit, 100) : 10;
        const result = await getTopVisitors(startDate, endDate, finalLimit);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get top visitors' });
    }
})

export default dataReportsRouter