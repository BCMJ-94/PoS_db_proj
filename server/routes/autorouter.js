import express from 'express'
import { selectFromWhereBuilder, insertQuery, updateSetWhereBuilder, oneOffQuery, openTransactionTab } from '../database.js'
import isAuthorized from '../utils/auth.js'

const autoRouter = express.Router()

autoRouter.use(isAuthorized)


autoRouter.get("/restaurantTables", async (req, res) => {
    try{
        const data = await selectFromWhereBuilder('', 'tables')
        const tables = await data[0]
        console.log("from autorouter/restaurantTables", data)
        res.status(200).json({tables})
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
})

autoRouter.post('/itemizedList', async(req, res)=>{
    const {transactionID} = req.body
    console.log(Object.keys(req.body).length)
    console.log("from itemized list: ", transactionID)
    try{
        const result = await selectFromWhereBuilder('', 'product_orders', ['transactionID', transactionID], '=' )
        const rslt = await result[0]
        const data = await oneOffQuery(
            `SELECT product_orders.quantity,product_orders.productID, products._name, products.price
             FROM product_orders
             INNER JOIN products ON product_orders.productID = products.productID
             WHERE product_orders.transactionID = ?`, transactionID) 
        
        const itemizedList = await data[0]
        console.log(rslt)
        res.status(200).json({itemizedList})
    }
    catch(err){
        //console.log(err)
        res.status(500).json({
            message : err
        })

    }
})

autoRouter.post("/openTabsOnTable", async(req,res)=> {
    const {tableID} = req.body
    try{
        const result = await selectFromWhereBuilder('transactionID', 'transactions', ['tableID', tableID], '=', ' AND paymentMethod IS NULL')
        const tIDs = await result[0]
        //console.log(`transactions open on table ${tableID}: `, tIDs)
        res.status(200).json({tIDs})
    }
    catch(err){
        //console.log("from autorouter: ",err)
        res.status(500).json({
            message : err
        })

    }
})

autoRouter.post("/addToOrder", async (req, res)=>{//will either insert a new row or update an existing row
    const employeeID = req.session.employee.employeeID
    const {quantity, productID, tableID, transactionID} = req.body
    console.log("request body: ", req.body)
    //const [transactionID]= await selectFromWhereBuilder('transactionID','transactions',['tableID', tableID],'=', ' AND paymentMethod IS NULL')//null payment method is a proxy for open tabs
    
    try{
        if(!transactionID){
            console.log("no id")
            throw new ReferenceError("invalid or missing transactionID")
            
        }
        const attempt_insert = await insertQuery('product_orders',['quantity', 'productID', 'transactionID'],[quantity, productID, transactionID])
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
                [quantity, productID, transactionID]
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
