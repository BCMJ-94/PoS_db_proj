import express from 'express'
import { selectFromWhereBuilder, insertQuery, updateSetWhereBuilder } from '../database.js'
import isAuthorized from '../utils/auth.js'

const autoRouter = express.Router()

autoRouter.use(isAuthorized)


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
    //try to insert, catch if it fails. try update instead
    try{
        const {quantity, productID, tableID} = req.body
        const [transactionID]= await selectFromWhereBuilder('transactionID','transactions',['tableID', '2'],'=', ' AND paymentMethod IS NULL')//null payment method is a proxy for open tabs
        console.log('from autorouter: ', transactionID[0])

        const attempt_insert = await insertQuery('product_orders',['quantity', 'productID', 'transactionID'],[quantity, productID, transactionID[0].transactionID])
    }
    catch(err){
        console.log(err)
        if(err.code == 'ER_DUP_ENTRY'){
//            const attempt_update = await updateQuery()
        }

    }
    console.log("testestestesteset")

})


export default autoRouter
