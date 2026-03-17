import React from 'react'
import LoginForm from './LoginForm'

export default function Login() {
    const handleLogin = ({employeeID, password}) => {
        // Sends to backend | not yet implemented
        console.log(`${employeeID}, ${password}`)
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
            <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Employee Login</h1>
                <LoginForm handleSubmit={handleLogin}/>
            </div>
        </div>
    )
}
