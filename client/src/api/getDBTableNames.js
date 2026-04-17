import { API_URL } from "./baseUrl";

export default async function getDBTableNames(){
    const endpoint = `${API_URL}/autorouter`

    const request = { credentials : 'include'}

    const response = await fetch(endpoint, request)

    const data = await response.json().catch(() => )



}