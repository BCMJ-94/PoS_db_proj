import { logoutEmployee } from "../../api/logoutEmployee";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from 'react-router-dom'
import NavBar from "../../routes/NavBar";

export default function Logout() {
    const { setEmployee } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutEmployee()
            setEmployee(null)
            navigate("/login", {replace: true}) // redirects to login page and replace changes how navigation affects the browser history stack (prevents user from going back to dashboard)
        
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <NavBar>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </NavBar>
        </>
    )
}