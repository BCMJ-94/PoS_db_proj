import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom'
import {useState, useEffect, React} from 'react'
import { getTabsOnTable } from "../../api/openTab";

export default function Row({ table }) {
    const nav = useNavigate()
    const [transactions, setTransactions] = useState([])


    useEffect(() =>{
        const retrieveTIDs = async () =>{
            try{
                //console.log("test: ", table.tableID)
                const res = await getTabsOnTable(table.tableID)
                setTransactions(res.tIDs)
            }
            catch(err){
               // console.log(err)
                setTransactions([])
            }
        }
        retrieveTIDs()
    },[])
    //console.log("from row component: ", transactions)

    const TIDs = transactions.map(element =>
        <>

        </>
    )

 
    return (
        <>
        <div className=" items-center w-80 justify-between rounded-lg border border-gray-300 bg-white p-2 py-4 shadow-sm">
            <p className="text-lg font-semibold">Table {table.tableID} {<Button name = "Start New Tab" type = "button"/>}</p>

            <div className="flex gap-2 items-center justify-right" style = {{marginTop : 5}}>
                Order #: 
                    <Button
                        name="View"
                        type="button"
                        onClick={() => nav(`/menu/${table.tableID}/`, {replace : true})}/>

            </div>
        </div>
        </>
    );
}