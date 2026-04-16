import {useState, useEffect,React} from "react"
import NavBar from "../../routes/NavBar.jsx"
import MenuButton from '../../components/MenuButton.jsx'
import loadMenu from "../../api/loadMenu.js"


export default function Menu(){
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

    console.log(menuItems)


    return(
        <>
        </>
    )
}