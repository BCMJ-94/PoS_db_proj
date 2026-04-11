import { API_URL } from "./baseUrl";

export default async function addProduct(productId, _name, price, menuType, isAvailable, stationID){
    const endpoint = `${API_URL}/products`

    const request = {
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
           productID : productID,
           _name : _name,
           menuType : menuType,
           isAvailable : isAvailable, 
           stationID : stationID 
        })
    }
    const response = await fetch(endpoint, request)

    if(!response.ok){
        const err = await.res.json().catch(()=>({}))
        throw new Error(
            err.message || `HTTP Error: ${err.status}`
            
        )
    }
    console.log(response.body)
    return {
        data
    }
}