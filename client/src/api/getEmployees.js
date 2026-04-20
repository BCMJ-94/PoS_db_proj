import { API_URL } from "./baseUrl";

export async function getEmployees() {
    const res = await fetch(`${API_URL}/employees`, {
        credentials: "include"
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`${res.status} ${data.message}`);
    return data;
}

export async function deleteEmployee(employeeID) {
    const res = await fetch(`${API_URL}/employees`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ employeeID })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`${res.status} ${data.message}`);
    return data;
}