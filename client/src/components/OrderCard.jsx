import {useState, useEffect, React, useContext} from 'react'
import { getItemizedList } from '../api/loadMenu'
import Button from './Button'

export default function OrderCard({tableID, transactionID, reload}){ 
   // console.log("from order card: ", transactionID)
   //const context = useContext(MenuContext)

    const[itemList, setList] = useState([])
    const[reloadSelf, setSelfReload] = useState(false)

    useEffect(() => {
        const retrieveList = async() => {
            try{
                const res = await getItemizedList(transactionID)
                setList(res.itemizedList)
                

            }
            catch(err){
                console.log(err.message, " failed to retrieve itemized list")
                setList([])
            }
        }
        retrieveList()
    },[itemList])

    useEffect((reload) => {
        if(reload){
            setSelfReload(true)
            console.log('rerendering')
        } 
            setSelfReload(false)
            return;
    },[reloadSelf])

    //console.log('from order card: ', itemList)

    const itemizedList = itemList.map(item => <li className = "flex justify-between" key = {item.productID} >{item._name} <div>{item.quantity}</div></li>)

    return(
        <>
            <div className = "orderCard" >
                <div className = "flex justify-between">
                    Transaction #{transactionID}       
                </div>
                    <div className = "flex justify-between text-decoration-line: underline">Items <div>Quantity</div> </div>
                    {itemizedList}
            <Button name = "Close Tab" type = "button" onClick={() => {console.log("closing out")}}/>

            </div>
        </>
    )
    
}