import React, { useState } from "react";
import Login from "./components/Login/Login";
import NewEmployee from "./components/NewEmployee/NewEmployee.jsx";
import Apitest from "./apitest.jsx"

function App(){
    const [view, setView] = useState("login")

	return (
        <>
            {view === "login" ? (
                <Apitest/>
            ) :
            null}
            <button 
                className="fixed bottom-4 right-4 bg-white rounded-lg shadow px-5 py-3"
                onClick={() => {
                    view === "login" ? setView("signup") : setView("login")
                }}
            >
                Toggle
            </button>
        </>
    )
}
export default App;