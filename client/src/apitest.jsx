import React from 'react'

export default function Apitest(){
    async function testget(){
        let endpoint = 'http://localhost:3030/'
        const req = await fetch(endpoint, {method: "GET"})
        const res = await req.json()
        console.log(res)
    }
    return (
        {testget}
    )
}