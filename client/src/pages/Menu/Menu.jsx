import {useState, useEffect, useContext, createContext, React} from "react"
import NavBar from "../../routes/NavBar.jsx"
import MenuButton from '../../components/MenuButton.jsx'
import loadMenu from "../../api/loadMenu.js"
import { useLocation } from "react-router"
import {useParams} from 'react-router-dom'
import OrderCard from "../../components/OrderCard.jsx"

const MenuContext = createContext(null)

export default function Menu(){
    const { tableID, transactionID} = useParams()
    //console.log("from menu: ", transactionID[0])
    const [menuItems, setMenu] = useState([])
    const [count, setCount] = useState(0)


    useEffect(() => {
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

    const handlePost = (newData) => {
        console.log("test")
    }


    const products = menuItems.map(item => <MenuButton onClick = {handlePost} product = {item} tableID = {tableID} key = {item.productID} /> )
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
                    <OrderCard transactionID = {transactionID}  />
                </div>
        </>
    )
}