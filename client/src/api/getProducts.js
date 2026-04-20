import { API_URL } from "./baseUrl";

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`, {
        credentials: "include"
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`${res.status} ${data.message}`);
    return data;
}

export async function deleteProduct(productID, _name) {
    const res = await fetch(`${API_URL}/products`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productID, _name })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`${res.status} ${data.message}`);
    return data;
}