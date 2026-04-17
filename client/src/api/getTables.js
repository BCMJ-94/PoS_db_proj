import { API_URL } from "./baseUrl"; 

export async function getTablesByEmployee(employeeID){
    const res = await fetch(`${API_URL}/employeeTables`, {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            employeeID
        })
    })

    const data = res.json().catch(() => ({}))

    if (!res.ok) {
        throw new Error (
            data.message || `HTTP Error: ${res.status}`
        );    
    }
    return data
}

export async function getAllTables(){
    const endpoint = `${API_URL}/autorouter/restaurantTables`
    const request = {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'include'
    }
    const response = await fetch(endpoint, request)
    const data = await response.json().catch(() => ({}))
    //console.log("from api:", data.tables)
    if (!response.ok){
        throw new Error (
            data.message || `HTTP Error: ${response.status}`
        )
    }
    return data
}