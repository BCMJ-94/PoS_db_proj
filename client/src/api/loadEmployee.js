
export async function loadEmployee() {
    const endpoint = 'http://localhost:3030/dashboard';
    const response = await fetch(endpoint, {
        credentials: "include",
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(`${response.status} ${data.message}`);
    }

    return data.employee ?? null;
}
