import React from "react"
import Buttom from "../Button/jsx"
function NewEmployeeForm(){

    const handleSubmit = (e) => {
        e.prevent

    };
    return(
        <>
        <form method = "get">
            <header>Add New Employee</header>
            <label>
                First Name
                <input name = "fname"/> <br></br>
            </label>
            <label>
                Last Name
                <input name = "lname"/> <br></br>
            </label>
            <label> 
                Hire Date
                <input name = "hireDate"/> <br></br>
            </label>
            <label>
                DOB 
                <input name = "dob"/> <br></br>
            </label>
            <label>
                Role 
                <input name = "shiftRole"/> <br></br>
            </label>
            <label>
                Hourly Rate 
                <input name = "hourlyRate"/> <br></br>
            </label>
            <button onClick ={handleSubmit}>Submit</button>

           
        </form>
        </>
    );
}

export default NewEmployeeForm