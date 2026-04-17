import { API_URL } from "./baseUrl";

//TODO: implement options to allow for selective loading of part of menu
export default async function loadMenu(){
    const endpoint = `${API_URL}/products`
    const response = await fetch(endpoint, {credentials : 'include'});
    const data = await response.json().catch(()=>({}))
    if(!response.ok){
        throw new Error(`${response.status} ${data.message}`);
    }
    return data
}