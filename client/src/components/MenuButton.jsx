import {useContext, React} from 'react'
import addToTab from '../api/modifyTab'

export default function MenuButton({product, tableID, tID, setReload, onClick}){
    //const {setData} = useContext(MenuContext)
    
    return(
        <div style = {{marginRight: 10, marginTop : 10} }>
            <button onClick={onClick} key = {product.productID} name = {product._name} className="p-2 rounded-md bg-[#5eb5f3a6] text-[rgb(255,255,255)] font-bold text-xl" > {product._name} </button>
        </div>
    )
}