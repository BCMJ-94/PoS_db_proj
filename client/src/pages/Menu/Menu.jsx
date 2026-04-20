import {useState, useEffect, useContext, createContext, React} from "react"
import NavBar from "../../routes/NavBar.jsx"
import MenuButton from '../../components/MenuButton.jsx'
import loadMenu from "../../api/loadMenu.js"
import { useLocation } from "react-router"
import {useParams} from 'react-router-dom'
import OrderCard from "../../components/OrderCard.jsx"
import addToTab from "../../api/modifyTab.js"


export default function Menu(){
    const { tableID, transactionID} = useParams()
    //console.log("from menu: ", transactionID[0])
    const [menuItems, setMenu] = useState([])
    const [render, setRender] = useState(false)
    let posted = false


    useEffect(() => {
        const retrieveMenu = async () =>{
            try{
                console.log("menu loading")
                const res = await loadMenu()
                setMenu(res.products)
            }
            catch(err){
                console.log(`failed to fetch menu`)
                setMenu([])
            }
        }
        retrieveMenu()
    },[])

    async function sendOrder(productID, tableID, tID) {
       // setRender(true)
        try{
            //console.log("from Menu: ", productID, tableID, tID)
            const response = await addToTab(1, productID, tableID, tID)
            posted = true
        }
        catch(err){
            console.log(err)

        }
        finally{
            setRender(false)
        }
    }

    const products = menuItems.map(item => <MenuButton onClick = {() => sendOrder(item.productID,tableID,transactionID)} tID = {transactionID} product = {item} tableID = {tableID} key = {item.productID} /> )
        return(
        <>
            <NavBar/>
            <div style = {{
                display : 'flex',
                alignItems : 'center',
                justifyContent: 'center'
            }}>
                {products}
            </div>
            <div style = {{
                display : 'flex',
                alignItems : 'right',
                justifyContent : 'right'}}>
                    <OrderCard transactionID = {transactionID} reload = {posted} />
                </div>
        </>
    )
}