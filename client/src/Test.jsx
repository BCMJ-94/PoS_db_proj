import { useAuth } from "./context/AuthProvider";

export default function Test() {
    const {employee} = useAuth()

    return (
        <p>
            {JSON.stringify(employee)}
        </p>
    )
}