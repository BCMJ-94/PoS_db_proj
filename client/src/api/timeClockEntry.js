export async function fetchClockIn() {
    const endpoint = 'http://localhost:3030/timeclock-entries/clock-in'
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({})
    })
    
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        throw new Error(`${res.status} ${data.message}`)
    }

    return data
}

export async function fetchClockOut() {
    const endpoint = 'http://localhost:3030/timeclock-entries/clock-out'
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({})
    })

    const data = await res.json().catch(() => ({}))

    if(!res.ok) {
        throw new Error(`${res.status} ${data.message}`)
    }

    return data
}