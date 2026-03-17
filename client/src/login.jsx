function Login(){
    return(
        <>
        <header>
            Login
        </header>
        <form method = "get">
            <label>
                EmployeeID 
                <input name = "empID"/>
                <button>Submit</button>
            </label>
        </form>
        </>
    );
}

export default Login