import { useEffect, useState } from "react"
import { getTablesByEmployee } from "../../api/getTables"
import { useAuth } from "../../context/AuthProvider"
import Row from "./TableRow"
import { getAllTables } from '../../api/getTables.js'
import NavBar from "../../routes/NavBar.jsx"

export default function Table() {
    const { employee } = useAuth()
    const [tables, setTables] = useState([])

     useEffect(() => {
         const retrieveTables = async () => {
             try {
                 const res = await getAllTables()
                 setTables(res.tables)
             } catch (err) {

                 console.log(err.message," Failed to retrieve tables")
             }
         }

         retrieveTables()
     }, [])
     //console.log(tables)


    return (
        <>
        <NavBar/>
        <div className="table-list">
            {tables.map((table) => (
                <Row key={table.tableID} table={table} />
            ))}
        </div>

        </>
    );
}