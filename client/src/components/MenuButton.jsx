import React from 'react'
import addToTab from '../api/modifyTab'

export default function MenuButton({product, tableID}){
    const sendOrder = async () => {
        console.log("sending", product.productID, " : ", product._name)
        const response = await addToTab(1, product.productID, tableID)
        //console.log(response.message);
    }

    return(
        <button onClick={sendOrder}key = {product.productID} name = {product._name} className="p-2 rounded-md bg-[#5eb5f3a6] text-[rgb(255,255,255)] font-bold text-xl" > {product._name} </button>
    )
}