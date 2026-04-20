import fetchUseRewards from "../api/useRewards"

export default function RewardsButton({tableID, email}) {
    const applyRewards = async () => {
        try{
            const response = await fetchUseRewards(tableID, email)
            console.log(response.message)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <button onClick={applyRewards} className="p-2 rounded-md bg[#5eb5f3a6] text=[rgb(255,255,255)] font-bold text-xl"> Apply Rewards
        </button>
    )
}