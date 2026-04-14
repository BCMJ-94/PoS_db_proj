import React from "react";
import Button from "./Button"
<<<<<<< HEAD
import addToTab from "../api/modifyTab"
import loadMenu from "../api/loadMenu" 
import NavBar from "../routes/NavBar"




export default function Menu(){
    const fetchMenu = async({}) => {
        const menu = await loadMenu()
        return menu
    }
        return(
        <>
        <NavBar/>

          <div>
            <Button onClick={fetchMenu} type = "button" name = "menu"/>
            </div> 
        </>
=======
import addToTab from "../api/modifyTab"; 

export default function Menu(){
    const sendOrder = async () => {
        const response = addToTab(1, productID, tableID)

    }
    return(
                <div>
                    <Button onClick = {sendOrder}  type  = "button" name  = "cheeseburger"/>
                </div>

>>>>>>> 444a7f635b0f8c4206070b49edb1ddbf1025513b
    )
}