import {API_URL } from '../api/baseUrl'


export default async function openTab(tableID){
    const endpoint = `${API_URL}/transactions/openTab`
    

    const req = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'include',
        body : JSON.stringify({
            tableID
        })
    }

    const res = await fetch(endpoint, req)
    const data = await res.json().catch(() => ({})) 
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
