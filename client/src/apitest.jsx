import React from 'react'

export default function Apitest(){
    async function testget(){
        let endpoint = 'https://jsonplaceholder.typicode.com/users'
        const req = await fetch(endpoint, {method: "GET"})
        const res = await req.json()
        console.log(res)
    }
  
}