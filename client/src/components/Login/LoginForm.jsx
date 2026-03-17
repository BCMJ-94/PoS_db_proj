import React from 'react'
import Button from '../Button'
import '../../index.css'

export default function LoginForm({handleSubmit}) {
    const onSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        handleSubmit({ employeeID: form.get('employeeID'), password: form.get('password') })
    }

    return (
        <div className="">
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="employeeID">Employee ID</label>
                    <input type="text" name="employeeID" id="employeeID" required/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required/>
                </div>
                <Button type="submit" name="Login" />
            </form>
        </div>
    )
}