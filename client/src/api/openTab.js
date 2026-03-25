
export default async function openTab(tableID, 
    employeeID, customerID, timePlaced){
    const endpoint = 'http://localhost:3030/transactions'

    try{
        const req = {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            credentials : 'include',
            body : JSON.stringify({
                tableID,
                employeeID,
                customerID,
                timePlaced
            })

        }
        const res = await fetch(endpoint, request)
        const data = await response.json().catch()(() => ({})) 
        if (!response.ok){
            throw new Error (
                data.message || `HTTP Error: ${response.status}`
        );
    }
    }

    catch(error){
        console.log(error)
    }

    return {
        data : data
    }
}