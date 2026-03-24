import React from 'react'
import Button from "../../components/Button.jsx"
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
    
    const goToOpenTab = () => {
        console.log("test");
    }

    return(
        <>
           <div style = {{display: "flex", alignItems : "center" , height : "100%"}}>
                <div>
                    <Button onClick = {goToOpenTab}  type = "button" name = "Open Tab"/>     
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
