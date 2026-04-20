import { useEffect, useState } from "react";
import NavBar from "../../routes/NavBar";
import { getEmployees, deleteEmployee } from "../../api/getEmployees";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getEmployees()
            .then(data => setEmployees(data))
            .catch(err => setError(err.message));
    }, []);

    const handleDelete = async (employeeID) => {
        try {
            await deleteEmployee(employeeID);
            setEmployees(prev => prev.filter(e => e.employeeID !== employeeID));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center py-10 bg-[rgb(206,226,240)] min-h-screen">
                <div className="bg-[rgb(248,247,246)] rounded-2xl px-10 py-8 shadow w-full max-w-4xl">
                    <h1 className="font-bold text-4xl text-[#5eb5f3a6] mb-6">Employees</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">First Name</th>
                                <th className="py-2 px-4">Last Name</th>
                                <th className="py-2 px-4">Role</th>
                                <th className="py-2 px-4">Hourly Rate</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.employeeID} className="border-b border-gray-200">
                                    <td className="py-2 px-4">{emp.employeeID}</td>
                                    <td className="py-2 px-4">{emp.firstName}</td>
                                    <td className="py-2 px-4">{emp.lastName}</td>
                                    <td className="py-2 px-4">{emp.shiftRole}</td>
                                    <td className="py-2 px-4">${emp.hourlyRate}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(emp.employeeID)}
                                            className="bg-red-400 text-white font-bold px-3 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {employees.length === 0 && !error && (
                        <p className="text-center text-gray-400 mt-4">No employees found.</p>
                    )}
                </div>
            </div>
        </>
    );
}