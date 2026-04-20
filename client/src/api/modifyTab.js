import { API_URL } from "./baseUrl";

export default async function addToTab(quantity, productID, tableID, transactionID){
    const endpoint = `${API_URL}/autorouter/addToOrder`

    const request = {
        method : 'POST', 
        headers : { "Content-Type" : 'application/json'},
        credentials : "include",
        body : JSON.stringify({
            quantity, productID, tableID, transactionID
        })
    }

    const response = await fetch(endpoint, request);
    const data = await response.json().catch(() => ({}))

    if (!response.ok){
        throw new Error (
            data.message || `HTTP Error: ${response.status}`
        );
    }
    console.log("test: ", data)
    return {
        data
    }
}

export  async function closeTab(tableID, email, total, tipAmount, paymentMethod){
    const endpoint = `${API_URL}/transactions/closeTab`

    const request = {
        method : 'PUT',
        headers : {
            'Content-Type' :'application/json'
        },
        credentials : 'include' ,
        body : JSON.stringify({
            tableID : tableID,
            email : email, 
            total : total, 
            tipAmount : tipAmount,
            paymentMethod : paymentMethod
        })
    }
    const response = await fetch(endpoint, request)
    const data = await response.json().catch(()=>{})

    console.log(data.message)
    return {
        data
    }
}