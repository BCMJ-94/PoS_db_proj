import { useEffect, useState } from "react";
import fetchPnL from "../../api/fetchPnL.js";
import fetchItemsSold from "../../api/fetchItemsSold.js";
import fetchTopSpenders from "../../api/fetchTopSpenders.js";
import fetchTopVisitors from "../../api/fetchTopVisitors.js";
import NavBar from "../../routes/NavBar.jsx";

// Creating a combined reports page that calls the APIs for the different reports!

export default function Reports() {

    // creating variables needed to combine APIs based on how those routes and the pages work
    // reminder: since this is just a new page based on existing routes, i don't need to make a route for it
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [pnl, setPnl] = useState(null) // first report
    const [itemsSold, setItemsSold] = useState([]) // second report
    const [topSpenders, setTopSpenders] = useState([]) // third report
    const [topVisitors, setTopVisitors] = useState([]) // fourth/third report pt2?

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    
    // this is being created so the user can actually choose which report they want!
    const [selectedReport, setSelectedReport] = useState("all")

    async function loadReports() {

        setLoading(true)
        setError(null)

        try {
            if (selectedReport === "pnl") {
                const pnlData = await fetchPnL(startDate, endDate)
                setPnl(pnlData)
                setItemsSold([])
                setTopSpenders([])
                setTopVisitors([])
            }
            else if(selectedReport === "items") {
                const itemsData = await fetchItemsSold(startDate, endDate)
                setItemsSold(Array.isArray(itemsData) ? itemsData : [])
                setPnl(null)
                setTopSpenders([])
                setTopVisitors([])
            }
            else if(selectedReport === "top spenders"){
                const topSpendersData = await fetchTopSpenders(startDate, endDate)
                setTopSpenders(Array.isArray(topSpendersData) ? topSpendersData : [])
                setPnl(null)
                setItemsSold([])
                setTopVisitors([])
            }
            else if(selectedReport === "top visitors"){
                const topVisitorsData = await fetchTopVisitors(startDate, endDate)
                setTopVisitors(Array.isArray(topVisitorsData) ? topVisitorsData : [])
                setPnl(null)
                setItemsSold([])
                setTopSpenders([])
            }
            else{
                const [pnlData, itemsSoldData, topSpendersData, topVisitorsData] = await Promise.all([
                    fetchPnL(startDate, endDate),
                    fetchItemsSold(startDate, endDate),
                    fetchTopSpenders(startDate, endDate),
                    fetchTopVisitors(startDate, endDate)
                ])
            setPnl(pnlData)
            setItemsSold(Array.isArray(itemsSoldData) ? itemsSoldData : [])
            setTopSpenders(Array.isArray(topSpendersData) ? topSpendersData : [])
            setTopVisitors(Array.isArray(topVisitorsData) ? topVisitorsData : [])
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { // Creating this should hopefully allow the page to re-load when the dates are changed! update: it works!
        if (startDate && endDate) loadReports();
    }, [startDate, endDate])

    return (
    <>
        <NavBar />

        <div className='items-center min-h-screen bg-[rgb(206,226,240)] text-[#5eb5f3a6] text-base md:text-lg'>
            <div className='bg-[rgb(248,247,246)] rounded-2xl px-10 py-8 shadow'>

        <div>
            <h1 className='font-bold text-4xl text-center mb-6'>Reports Dashboard</h1>

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}>
            </input>

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}>
            </input>

            <button onClick={loadReports}>Run Reports</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}

            {/* creating the select button for what report the user wants */}
            <div className="mb-10">
                <label>Report Type: </label>

                <select
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}>
                    <option value="all">All Reports</option>
                    <option value="pnl">P&L</option>
                    <option value="items">Items Sold</option>
                    <option value="top spenders">Top Spenders</option>
                    <option value="top visitors">Top Visitors</option>
                </select>
            </div>

            {/* PNL PART OF REPORT PAGE AAAAAAAAAAaa! 1st report! i hope this works update: it works!*/}

            {pnl && (
                <div className="mb-10">
                    <h2 className="font-bold mb-4">P&L Summary</h2>

                    <div className="space-y-3">
                        <p>Revenue: ${pnl.totalRevenue}</p>
                        <p>Food Cost: ${pnl.totalFoodCost}</p>
                        <p>Labor Cost: ${pnl.totalLaborCost}</p>
                        <p>Profit: ${pnl.profit}</p>
                    </div>
                </div>
            )}


            {/* ITEMS SOLD PART OF REPORT PAGE! 2nd report!! i really hope this works update it works!*/}
            {itemsSold.length > 0 && (
                <div className="mb-10">
                    <h2 className="font-bold">Items Sold</h2>

                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th className="p-3 w-1/4">Product</th>
                                <th className="p-3 w-1/4">Price</th>
                                <th className="p-3 w-1/4">Qty</th>
                                <th className="p-3 w-1/4">Revenue</th>
                            </tr>
                        </thead>

                        <tbody>
                            {itemsSold.map((item, index) => (
                                <tr key={index}>
                                    <td className="p-3 w-1/4">{item.productName}</td>
                                    <td className="p-3 w-1/4">${item.price}</td>
                                    <td className="p-3 w-1/4">{item.totalQuantitySold}</td>
                                    <td className="p-3 w-1/4">${item.totalRevenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}

            {/* TOP SPENDERS PART OF REPORT PAGE! 3rd report!! i really hope this works update: it finally works!*/}
            {topSpenders.length > 0 && (
                <div className="mb-10">
                    <h2 className="font-bold">Top Spenders</h2>

                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th className="p-3 w-1/4">Customer</th>
                                <th className="p-3 w-1/4">Total Spent</th>
                                <th className="p-3 w-1/4">Total Visits</th>
                                <th className="p-3 w-1/4">Reward Points</th>
                            </tr>
                        </thead>

                        <tbody>
                            {topSpenders.map((customer, index) => (
                                <tr key={index}>
                                    <td className="p-3 w-1/4">{customer.firstName} {customer.lastName}</td>
                                    <td className="p-3 w-1/4">${customer.totalSpent}</td>
                                    <td className="p-3 w-1/4">{customer.totalVisits}</td>
                                    <td className="p-3 w-1/4">${customer.rewardPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}

            {/* TOP SPENDERS PART OF REPORT PAGE! 4th/3rd part 2 report!! same structure known to work!*/}
            {topVisitors.length > 0 && (
                <div className="mb-10">
                    <h2 className="font-bold">Top Visitors</h2>

                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th className="p-3 w-1/4">Customer</th>
                                <th className="p-3 w-1/4">Total Visits</th>
                                <th className="p-3 w-1/4">Total Spent</th>
                                <th className="p-3 w-1/4">Reward Points</th>
                            </tr>
                        </thead>

                        <tbody>
                            {topVisitors.map((customer, index) => (
                                <tr key={index}>
                                    <td className="p-3 w-1/4">{customer.firstName} {customer.lastName}</td>
                                    <td className="p-3 w-1/4">${customer.totalVisits}</td>
                                    <td className="p-3 w-1/4">{customer.totalSpent}</td>
                                    <td className="p-3 w-1/4">${customer.rewardPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
        </div>
        </div>
    </>
    )
}