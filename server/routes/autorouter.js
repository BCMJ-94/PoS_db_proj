import express from 'express'
import { selectFromWhereBuilder, insertQuery, updateSetWhereBuilder, oneOffQuery } from '../database.js'
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
    const {quantity, productID, tableID} = req.body
    console.log(req.body)
    const [transactionID]= await selectFromWhereBuilder('transactionID','transactions',['tableID', tableID],'=', ' AND paymentMethod IS NULL')//null payment method is a proxy for open tabs
    
    try{
        console.log('from autorouter: ', transactionID[0])

        const attempt_insert = await insertQuery('product_orders',['quantity', 'productID', 'transactionID'],[quantity, productID, transactionID[0].transactionID])
    }
    catch(err){
        console.log(err)
        if(err.code == 'ER_DUP_ENTRY'){
            const attempt_update = await oneOffQuery(//ugly ugly ugly
                `UPDATE product_orders SET quantity = quantity + ? WHERE productID = ? AND transactionID = ?`,
                [quantity, productID, transactionID[0].transactionID]
            )
            console.log(attempt_update)
            res.status(201).json({
                message : "successfully updated quantity"
            })
            
        }
        else{
            res.status(500).json({
                message : err.code
            })
        }

    }
   

})


export default autoRouter
