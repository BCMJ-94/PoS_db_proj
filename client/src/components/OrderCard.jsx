import {useState, useEffect, React} from 'react'
import { getItemizedList } from '../api/loadMenu'

export default function OrderCard({tableID, transactionID, reload, setReload}){
    console.log("from order card: ", transactionID)

    const[itemList, setList] = useState([])

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
    },[])

    console.log('from order card: ', itemList)

    const itemizedList = itemList.map(item => <li className = "flex justify-between" key = {item.productID} >{item._name} <div>{item.quantity}</div></li>)

    return(
        <>
            <div className = "orderCard" >
                <div className = "flex justify-between">
                    Transaction #{transactionID}       
                </div>
                    <div className = "flex justify-between text-decoration-line: underline">Items <div>Quantity</div> </div>
                    {itemizedList}

            </div>
        </>
    )
    
}