import express from 'express'
import { selectFromWhereBuilder, insertQuery } from '../database.js'
import isAuthorized from '../utils/auth.js'

const autoRouter = express.Router()

autoRouter.use(isAuthorized)

autoRouter.get('/', async (req,res)=>{
    try{

    }
    catch(err){

    }
})

autoRouter.get("/restaurantTables", async (req, res) => {
    try{
        const data = await selectFromWhereBuilder('', 'tables')
        const tables = await data[0]
        //console.log("from autorouter", tables[0])
        res.json({tables})
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
})

autoRouter.post("/addToOrder", async (req, res)=>{
    try{
        const {quantity, productID, tableID} = req.body
        const [transactionID]= await selectFromWhereBuilder('transactionID','transactions',['tableID', '2'],'=')
        console.log('from autorouter: ', [transactionID])
        //const result = await insertQuery('product_orders')
    }
    catch(err){
        console.log(err)
    }

})

export default autoRouter
