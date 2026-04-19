import express from 'express'
import { getTopSpenders } from '../database.js';
import isAuthorized from '../utils/auth.js';

const topSpendersRoute = express.Router()

topSpendersRoute.use(isAuthorized)

topSpendersRoute.get('/', async (req, res) => {
    const { start, end } = req.query;
        try {
            if (!start || !end) {
                return res.status(400).json({ message: 'Start and end dates required' })
            }

            const startDate = `${start} 00:00:00`
            const endDate = `${end} 23:59:59`

            const result = await getTopSpenders(startDate, endDate);

            res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get top spenders' });
    }
})

export default topSpendersRoute