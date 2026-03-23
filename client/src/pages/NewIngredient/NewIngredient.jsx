import React from 'react'
import NewIngredientForm from './new_ingredient_form'

function NewIngredient(){
    const submitNewIngredient = async({ingredientID, _name, pricePerUnit}) => {
        const endpoint = 'http://localhost:3030/' //update with proper path once it exists
        const req = await fetch(endpoint, {method : 'POST', body : JSON.stringify({ingredientID, _name, pricePerUnit})})
        const res = await req.text()
    }
    return(
        <div className='flex flex-col items-center justify-center h-screen bg-[rgb(206,226,240)]'>
            <div className="flex flex-col items-center bg-[rgb(248,247,246)] rounded-2xl gap-6 px-10 py-8 shadow">
                <h1 className='font-bold text-4xl text-[#5eb5f3a6]'>Add Ingredient</h1>
                <NewIngredientForm handleSubmit={submitNewIngredient}/>
            </div>
        </div>

    )

}
export default NewIngredient