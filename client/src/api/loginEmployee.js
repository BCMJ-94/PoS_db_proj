
export async function loginEmployee(employeeID, password) {
    const endpoint = 'http://localhost:3030/login'
    const request = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            employeeID,
            password
        })
    }

    const response = await fetch(endpoint, request)
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        throw new Error(`${response.status} ${data.message}`)
    }

    return {
        data: data
    }
}
