
function NewProduct(){


    const handleClick = () =>{};
    return(
        <>
        <form>
            <header>Add New Product</header>
            <label>
                ProductID 
                <input name = "productID"/> <br/>
            </label>
            <label>
                Name 
                <input name = "_name"/> <br/>
            </label>
            <label>
                Price
                <input name = "price"/> <br/>
            </label>
            <label>
                Menu Type 
                <input name = "menuType"/> <br/>
            </label>
            <label>
                StationID 
                <input name = "stationID"/> <br/>
            </label>

            <button onClick = {handleClick}> Submit </button>
        </form>
        </>
    );
}

export default NewProduct