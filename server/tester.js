import { fetchAllTableNames, selectFromWhereBuilder, insertQuery } from './database.js'

//const result= await fetchAllTableNames()
//console.log("test1: ",result)

const [result2] = await selectFromWhereBuilder('transactionID','transactions',['tableID', '2'],'=')
console.log("test2: ",[result2])

/*
const result3 = await selectFromWhereBuilder(['_name','productID'], 'products', ['productID','6'],'<')
console.log(result3)

const insertTest = await insertQuery('ingredients', '_name', 'carrot')
*/





