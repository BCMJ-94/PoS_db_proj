import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login/Login";
import Test from "../Test";
import { useAuth } from "../context/AuthProvider";
import Dashboard from "../pages/Dashboard/Dashboard";
import NewEmployee from "../pages/NewEmployee/NewEmployee";
import OpenTab from "../pages/Tab/startTab";

export default function AppRoutes() {
    const { employee, loading } = useAuth()

    if (loading) {
        return null
    }

    return (
        <Routes>
            <Route path="/login" element={employee ? <Navigate to="/dashboard" replace /> : <Login />}/>

            <Route element={<ProtectedRoutes />} >
                <Route path="/dashboard" element={<Dashboard/>}/> 
                <Route path="/newemployee" element = {<NewEmployee/>}/>
                <Route path="/Tab" element = {<OpenTab/>}/>
            </Route>

            <Route path="*" element={<Navigate to={"/login"} replace />}></Route>
            
        </Routes>
    )
}