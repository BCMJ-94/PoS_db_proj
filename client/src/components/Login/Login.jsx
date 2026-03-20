import React from 'react'
import LoginForm from './LoginForm'

export default function Login() {
    const handleLogin = async ({employeeID, password}) => {
        const endpoint = 'http://localhost:3030/employees'
        const req = await fetch(endpoint, 
            {method :'POST',
            body : JSON.stringify({employeeID, password})
        });
        console.log(`${employeeID}, ${password}`)
    }

    const testget = async () =>{
        const endpoint = 'http://localhost:3030/'
        const req = await fetch(endpoint) 
        const res = await req.text()
        console.log(res)
        
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
