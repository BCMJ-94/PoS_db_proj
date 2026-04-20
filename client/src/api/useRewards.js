import { API_URL } from "./baseUrl"


export default async function fetchUseRewards(tableID, email){
    const endpoint = `${API_URL}/transactions/useRewards`
    
    const req = {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
            tableID,
            email
        })
    }
    const response = await fetch(endpoint,req)
    const data = await response.json().catch(() => ({}))
    console.log(data.message)
    
    if (!response.ok){
        throw new Error (`${response.status} ${data.message}`)
    }

    return data
}
