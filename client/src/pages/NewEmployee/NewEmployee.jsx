import React from "react"
import NewEmployeeForm from "./new_employee_form.jsx"
import addNewEmployee from "../../api/addNewEmployee.js"
import { useAuth } from '../../context/AuthProvider'

function NewEmployee(){
    const { setEmployee } = useAuth()
    const submitNewEmployee = async ({employeeID, 
        firstName, lastName, dob, hireDate, role, hourlyRates}) => {
            const { data } = await addNewEmployee({employeeID, 
            firstName, lastName, dob, hireDate, role, hourlyRates})
        }
   
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
            <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Register New Employee</h1>
                <NewEmployeeForm handleSubmit={submitNewEmployee}/>
            </div>
        </div>

    )
}
export default NewEmployee