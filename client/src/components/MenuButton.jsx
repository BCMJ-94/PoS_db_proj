import React from 'react'
import addToTab from '../api/modifyTab'

export default function MenuButton({product}){
    const data = JSON.stringify({product})
    const sendOrder = async () => {
        const response = await addToTab(1, product.productID, product.tableID)
        console.log(response.message);
        
    }

    return(
        <button onClick={sendOrder} name = {product.name} className="p-2 rounded-md bg-[#5eb5f3a6] text-[rgb(255,255,255)] font-bold text-xl" key = {product.productID}> {product.name} </button>
    )
}