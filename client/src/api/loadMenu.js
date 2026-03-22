//TODO: implement options to allow for selective loading of part of menu
export default async function loadMenu(options = {}){
    const endpoint = 'http://localhost:3030/menu'
    try {
        const response = await fetch(endpoint);

        if (!response.ok){
            const err = await response.json().catch(() => ({}));
            throw new Error (
                err.message || `HTTP Error: ${response.status}`
            );
            
        }
        return await response.json()

    }
    
    catch(error){
        console.error('fetch error: ', error)
        throw error;
    }
}