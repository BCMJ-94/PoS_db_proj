import React from "react";
import Button from "./Button"
import addToTab from "../api/modifyTab"; 

export default function Menu(){
    const sendOrder = async () => {
        const response = addToTab(1, productID, tableID)

    }
    return(
                <div>
                    <Button onClick = {sendOrder}  type  = "button" name  = "cheeseburger"/>
                </div>

    )
}