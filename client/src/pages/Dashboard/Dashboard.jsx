import React from 'react'
import Button from "../../components/Button.jsx"
import { useNavigate } from 'react-router-dom'
import NavBar from '../../routes/NavBar.jsx'
import MenuButton from '../../components/MenuButton.jsx'
import Menu from '../Menu/Menu.jsx'
import { getAllTables } from '../../api/getTables.js'
import { loadEmployee } from '../../api/loadEmployee.js'
import loadMenu from '../../api/loadMenu.js'

//pretty much just using this to test the api
export default function Dashboard(){
    const nav = useNavigate() 
    const tableID = 1 //for testing, remove later

    const goToOpenTab = () => {
        try{
            console.log("redirect to open tab")
            nav("/Tab", {replace : true})
        }
        catch(error){
            console.log(error.message)
        }
    }

    const getMenu = async () => {
        const menu = await loadMenu()
        console.log(menu.products)
    }

    const getTables = async() => {
        const tables = await getAllTables()
        console.log("from dashboard:" ,tables.tables) 
    }

    const registerNewEmployee = () => {
        try{
            console.log("redirect to employee registration")
            nav("/newemployee", {replace : true})
        } 
        catch(error){
            console.log(error)
        }
    }

    const addNewProduct = () => {
        try{
            console.log("redirect to new product page")
            nav("/newproduct", {replace : true})
        }
        catch(error){
            console.log(error.message)
        }
    }

    return(
        <>
            <NavBar />
           <div style = {{display: "flex", alignItems : "center" , height : "100%"}}>
                <div>
                    <Button onClick = {registerNewEmployee} type = "button" name = "Register New Employee"/>
                </div>
                <div>
                    <Button onClick = {addNewProduct} type  = "button" name  = "Add New Product"/>
                </div>
                <div>
                    <Button onClick = {getMenu}  type  = "button" name  = "Menu"/>
                </div>
                <div>
                    <Button onClick={getTables} type = "button" name = "Tables" />
                </div>
                <div>
                    <Menu tableID = {tableID}/>
                </div>
          
            </div> 
        </>
    )
}
