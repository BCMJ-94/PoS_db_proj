
export default async function addNewEmployee({firstName, lastName, dateHired, 
    dateOfBirth, shiftRole, hourlyRate, password}){
    const endpoint = 'http://localhost:3030/employees'

    try {
        const response = await fetch(endpoint, {
            method : 'POST',
            headers: {"Content-Type" : "application/json"},
            credentials : "include",
            body : JSON.stringify({firstName, lastName, dateHired, dateOfBirth, shiftRole, hourlyRate, password})
        })
        if (!response.ok){
            const err = await response.json().catch() (() => ({}));
            throw new Error (
                err.message || `HTTP Error: ${response.status}`
            );
        }
        const data = await response
        console.log(data)
    }

    catch(error){
        console.error('fetch error: ', error)
        throw error;
    }

}