import React from "react";
import Button from "./Button"
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
    )
}