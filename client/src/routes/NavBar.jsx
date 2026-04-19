import { NavLink } from "react-router";
import { useAuth } from "../context/AuthProvider";

export default function NavBar() {

    const rolePermissions = {
        Tab: ["manager", "server"],
        newemployee: ["manager"],
        timeclock: ["manager", "server", "crew"],
        payrollperiod: ["manager"],
        reports: ["manager"]
    }
    
    {/* 
    Server
        Open Tab
        Clock-in
        Add customer
        Hours/Revenue
    */}
    {/* 
    Host
        Clock-in
        Puts customer to table
        Hours/Revenue

    */}
    {/* 
    Bussers/Food-Runners
        Clock-in
        Hours/Revenue
    */}
    {/* 
    Managers
        Everything
        New/Delete Employees
        Modify hours for employees
        Modify clock-in/out
        Modify menu
        Any data reports
    */}
    const { employee } = useAuth()

    function canAccess(role, allowedRoles) {
        return allowedRoles.includes(role)
    }

    return (
        <nav className="flex flex-row justify-between bg-[#5eb5f3a6] text-[rgb(255,255,255)] font-bold text-xl items-center py-2 px-5">
            <div className="flex flex-row gap-7">
                {canAccess(employee.shiftRole, rolePermissions.Tab) && (
                    <NavLink to={'/Tab'}>Tab</NavLink>
                )}

                {canAccess(employee.shiftRole, rolePermissions.newemployee) && (
                    <NavLink to={'/newemployee'}>New Employee</NavLink>
                )}

                {canAccess(employee.shiftRole, rolePermissions.timeclock) && (
                    <NavLink to={'/timeclock'}>Time Clock</NavLink>
                )}

                {canAccess(employee.shiftRole, rolePermissions.payrollperiod) && (
                    <NavLink to={'/payrollperiod'}>Payroll Period</NavLink>
                )}

                {canAccess(employee.shiftRole, rolePermissions.reports) && (
                    <NavLink to={'/reports'}>Reports</NavLink>
                )}
            </div>

            <div>
                <NavLink to={'/dashboard'}>
                    <p>{ `${employee.firstName}  ${employee.lastName} | ${employee.shiftRole[0].toUpperCase() + employee.shiftRole.slice(1)}` }</p>
                </NavLink>
            </div>
        </nav>
    )
}