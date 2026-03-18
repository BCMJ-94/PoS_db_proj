
function NewIngredient(){
    const handleClick = () => {

    };
    return(
        <>
        <form method = "post">
            <header>Add New Ingredient</header>
            <label>
                IngredientID 
                <input name = "ingredientID"/> <br/>
            </label>
            <label>
                Name 
                <input name = "_name"/> <br/>
            </label>
            <label>
                Price per Unit 
                <input name= "pricePerUnit"/> <br/>
            </label>
        </form>
        <button onClick = {handleClick}> Submit </button>
        </>
    );
}