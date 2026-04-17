import {useState, useEffect, React} from "react"
import NavBar from "../../routes/NavBar.jsx"
import MenuButton from '../../components/MenuButton.jsx'
import loadMenu from "../../api/loadMenu.js"
import { useLocation } from "react-router"
import {useParams} from 'react-router-dom'


export default function Menu(){
    const { tableID } = useParams()
   
    const [menuItems, setMenu] = useState([])
    useEffect(()=>{
        const retrieveMenu = async () =>{
            try{
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
    console.log("from menu component: ", tableID)

    const products = menuItems.map(item => <MenuButton product = {item} tableID = {tableID} key = {item.productID} />)

    return(
        <>
            <NavBar/>
            <div>
                {products}
            </div>
        </>
    )
}