import { API_URL } from "./baseUrl";

export default async function addToTab(productID){
    const endpoint = `${API_URL}/transactions/addOrder`

    const request = {
        method : 'POST', 
        headers : { "Content-Type" : 'application/json'},
        credentials : "include",
        body : JSON.stringify({
            quantity, productID, tableID
        })
    }

    const response = await fetch(endpoint, request);
    const data = await response.json().catch(() => {})

    if (!res.ok){
        throw new Error (
            data.message || `HTTP Error: ${res.status}`
        );
    }
    console.log(data.body)
    return {
        data
    }
}

export default async function closeTab(){
    const endpoint = `${API_URL}/transactions/closeTab`

    

}