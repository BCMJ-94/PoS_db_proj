import { API_URL } from "./baseUrl"

export async function logoutEmployee() {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
    })

    const data = await response.json().catch(() => ({}))

    if(!response.ok) {
        throw new Error(data.message || 'Logout failed!')
    }

    return {
        data: data
    }
}