import express from 'express'
import { selectFromWhereBuilder } from '../database.js'
import isAuthorized from '../utils/auth.js'

const autoRouter = express.Router()

autoRouter.use(isAuthorized)

autoRouter.get("/restaurantTables", async (req, res) => {
    try{
        const data = await selectFromWhereBuilder('', 'tables')
        const tables = await data[0]
        console.log("from autorouter", tables[0])
        res.json({tables})
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
})

export default autoRouter
