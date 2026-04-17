import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom'

export default function Row({ table }) {
    const nav = useNavigate()
  
    return (
        <div className="flex items-center w-80 justify-between rounded-lg border border-gray-300 bg-white p-2 py-4 shadow-sm">
            <p className="text-lg font-semibold">Table {table.tableID}</p>

            <div className="flex gap-2">
                {table.isOpen ? (
                    <>
                        <Button
                            name="Modify"
                            type="button"
                            onClick={() => console.log("Modify")}
                        />
                        <Button
                            name="Close"
                            type="button"
                            onClick={() => console.log("Close")}
                        />
                    </>
                ) : (
                    <Button
                        name="OpenTab"
                        type="button"
                        onClick={() => nav(`/menu/${table.tableID}`, {replace : true})}
                    />
                )}
            </div>
        </div>
    );
}