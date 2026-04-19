import express from 'express'
import { selectFromWhereBuilder, insertQuery, updateSetWhereBuilder, oneOffQuery, openTransactionTab } from '../database.js'
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

autoRouter.post("/addToOrder", async (req, res)=>{//will either insert a new row or update an existing row
    const employeeID = req.session.employee.employeeID
    const {quantity, productID, tableID} = req.body
    console.log("request body: ", req.body)
    const [transactionID]= await selectFromWhereBuilder('transactionID','transactions',['tableID', tableID],'=', ' AND paymentMethod IS NULL')//null payment method is a proxy for open tabs
    
    try{
        const attempt_insert = await insertQuery('product_orders',['quantity', 'productID', 'transactionID'],[quantity, productID, transactionID[0].transactionID])
        console.log("insert successful")
        res.status(201).json({
            message : "insert successful"
        })
    }
    catch(err){
        if(err.code == 'ER_DUP_ENTRY'){
            console.log("entry exists. start update operation")
            const attempt_update = await oneOffQuery(//ugly ugly ugly
                `UPDATE product_orders SET quantity = quantity + ? WHERE productID = ? AND transactionID = ?`,
                [quantity, productID, transactionID[0].transactionID]//just pulling first ID for rn, client should be sending a specific ID to add to
            )
            console.log("update attempt", attempt_update)
            res.status(200).json({
                message : "successfully updated quantity"
            })
            
        }
        else if(err.name == 'TypeError' || err.name == 'ReferenceError'){
            console.log(`no open transaction(s) on table ${tableID}, opening new transaction`)
            const result = await openTransactionTab(tableID, employeeID)
            if(result.transactionID){
                console.log(`opened new transaction successfully. transactionID = ${result.transactionID}`)
            }
            else{
                res.status(503).json({
                    message : `could not open new transaction on table: ${tableID}, try again`
                                })
            }
            const insert = await insertQuery('product_orders', ['quantity', 'productID', 'transactionID'], [quantity, productID, result.transactionID])
            console.log("insert: ", insert)
            res.status(201).json({
                message : `opened new tab id: ${result.transactionID} on table: ${tableID}`
            })
        } 
        else{

            res.status(500).json({
                message : err
            })
        }
    }
})

autoRouter.patch("/decrementOrder", async(req, res) => {
    const employeeID = req.session.employee.employeeID
    const {quantity, productID, tableID} = req.body
    console.log("request body: ", req.body)
    const [transactionID]= await selectFromWhereBuilder('transactionID','transactions',['tableID', tableID],'=', ' AND paymentMethod IS NULL')//null payment method is a proxy for open tabs
    try{
        const result = await updateSetWhereBuilder('product_orders', 'quantity', ['productID', productID],['transactionID', transactionID[0].transactionID], quantity, 'DECREMENT')
        res.status(200).json({
            message : result
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message : err
        })
    }
})

autoRouter.patch("/closeTab", async(req,res)=>{

})


export default autoRouter
