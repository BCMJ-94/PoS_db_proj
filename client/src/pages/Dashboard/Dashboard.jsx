import React from 'react'
import Button from "../../components/Button.jsx"

export default function Dashboard(){
    return(
        <>
           <div style = {{display: "flex", alignItems : "center" , height : "100%"}}>
                <div>
                    <Button type = "button" name = "Open Tab"/>     
                </div>  
                <div>
                    <Button type = "button" name = "Register New Employee"/>
                </div>
                <div>
                    <Button type  = "button" name  = "Add New Product"/>
                </div>
            </div> 
        </>
    )
}