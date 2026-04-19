import { API_URL } from "./baseUrl";

export default async function fetchTopVisitors(startDate, endDate){
    const endpoint = `${API_URL}/top-visitors?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`

    const response= await fetch(endpoint, {
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : "include",
    })

    
    if (!response.ok){
        const err = await response.json().catch(() => ({}))
        throw new Error(
            err.message || `HTTP Error: ${response.status}`
        );
    }

    return await response.json()
}
