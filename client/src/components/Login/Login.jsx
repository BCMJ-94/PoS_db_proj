import React from 'react'
import LoginForm from './LoginForm'

export default function Login() {
    const handleLogin = ({employeeID, password}) => {
        console.log(`${employeeID}, ${password}`)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm handleSubmit={handleLogin}/>
        </div>
    )
}
