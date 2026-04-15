import { fetchAllTableNames, selectFromWhereBuilder} from './database.js'

//const [result] = await selectFromWhere('', 'products', '')//test first condition
//console.log("test1: ",result)

//const [result2] = await selectFromWhere('productID', 'products', '')
//console.log("test2: ",[result2])

const result3 = await selectFromWhereBuilder(['_name','productID'], 'products', ['productID','6'],'<')
console.log(result3)






